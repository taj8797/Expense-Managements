require("dotenv").config();
const cron = require("node-cron")
const crypto = require("crypto");
const node_mailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const User = require("../model/authModel");


// cron.schedule('* * * * *', async () => {
//   try {
//     const now = new Date();
//     await User.deleteMany({ isVerified: false, createdAt: { $lt: now.getTime() - (30 * 1000) } });
//     console.log('Cleaned up unverified users');
//   } catch (error) {
//     console.error('Error during cleanup:', error);
//   }
// });

function generateToken(_id, email) {
  return jwt.sign({ _id, email }, process.env.SECRET_KEY, { expiresIn: "3d" });
}



const handleUserSignup = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if(existingUser){
      if(existingUser.isVerified){

    
  
      return res.status(400).json({ error: "User already exit" });
    }
    
  }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ userName, email, password: hashedPassword });
    // const result= await newUser.save();

    const generatedOTP = crypto.randomInt(100000, 999999).toString();

    newUser.otp = generatedOTP;
    newUser.otpExpires = Date.now() + 3600000; // OTP expires in 1 hour

    // await newUser.save();

    let transporter = node_mailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      // from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification OTP",
      text: `Your OTP is ${generatedOTP}`,
      html: `<b>Your OTP is ${generatedOTP}</b>`,
    });
  
   
    await newUser.save();
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};






///===============================otp verifying by email by nodemailer in signup  ==========================

const handleOtpVerification = async (req, res) => {
  const { otp } = req.body;

  try {
    const user = await User.findOne({ otp });

    if (!user) {
      return res.status(400).json({ error: "Invalid  OTP" });
    }

    const currentTime = Date.now();
    const otpExpires = new Date(user.otpExpires).getTime();

    if (user.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    if (currentTime > otpExpires) {
      return res.status(400).json({ error: "Expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Account verified successfully" });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ======================== login user and token generate ==========================================

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  try {
    // check if  all details are entered
    if (!email || !password) {
      return res.status(400).json({
        error: "Please fill out all fields",
      });
    }

    // check if user exists / email is valid
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        error: "Invalid email!",
      });
    }

    // if email is valid, then check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        error: "Password does not match!",
      });
    }

    // if all credentials are correct
    const token = generateToken(user._id, user.email);

    // send back the token
    return res.status(200).json({ username: user.username, token });
  } catch (err) {
    console.log("Error logging in user:", err);
    return res.status(500).json({
      error: err.message,
    });
  }
}

// =======================================================forget Password ======================================

// thapacode

const sendEmail = async (req, res) => {
  const { email } = req.body;

  const generatedOTP = crypto.randomInt(100000, 999999).toString();
  try {
    const userExit = await User.findOne({ email: email });
    if (!userExit) {
      return res.status(404).json({
        error: "Invalid email!",
      });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { otp: generatedOTP, otpExpires: Date.now() + 3600000 }, // OTP expires in 1 hour
      { new: true, upsert: true }
    );
    console.log("usereer==========eeeeee", user);
    let transporter = node_mailer.createTransport({
      // host : "smtp.ethereal.email",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      // from : process.env.EMAIL_USER,
      to: email,
      subject: "Password Recovery OTP",
      text: `Your OTP is ${generatedOTP}`,
      html: `<b>Your OTP is ${generatedOTP}</b>`,
    });
    return res.status(200).json({ message: "opt send successfully", info });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
//=========================verifyOtp by email ===================

const verifyOtpEmail = async (req, res) => {
  const { email, otp } = req.body;
  console.log("Email provided for verification:", email); // Log the provided email
  console.log("OTP provided for verification:", otp); // Log the provided OTP

  try {
    const user = await User.findOne({ otp });
    console.log("User found for verification:", user); // Log the user found

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp === otp && user.otpExpires > Date.now()) {
      // Optionally, update the user's verified status here
      await User.updateOne(
        { email },
        { verified: true, otp: null, otpExpires: null }
      );
      return res.send({ message: "OTP verified successfully" });
    } else {
      return res.status(400).send({ message: "Invalid or expired OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error); // Log the error
    return res.status(500).json({ error: error.message });
  }
};

const mongoose = require("mongoose");

const reset_Password = async (req, res) => {
  const email = req.params.id;

  // Check if the email is a valid ObjectId (in case it's a user ID instead)
  if (mongoose.Types.ObjectId.isValid(email)) {
    const userId = email;
    const user = await User.findById(userId);
    if (user) {
      email = user.email;
    }
  }

  if (!email) {
    return res.status(400).json({ error: "Invalid email or user ID" });
  }

  console.log("Email:", email);
  const { newPassword, confirmPassword } = req.body;

  // Validate passwords match
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    const user = await User.findOneAndUpdate(
      { email: email },
      { password: hashedPassword, otp: null, otpExpires: null },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while resetting the password" });
  }
};


// =================get userDetaila=============

const getUserDetail = async (req, res) => {
  try {
      const user = await User.findById(req.user.id);
      if (!user){
        return res.status(404).json({ message: "User not found" });
      }
  return res.status(200).json(user)
  } catch (error) {
      console.error(error);
      res.sendStatus(500);
  }
}

module.exports = {
  handleUserSignup,
  handleOtpVerification,
  handleUserLogin,
  sendEmail,
  verifyOtpEmail,
  reset_Password,getUserDetail
};
