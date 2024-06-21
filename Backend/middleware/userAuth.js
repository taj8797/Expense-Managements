const jwt = require("jsonwebtoken");

const user_model = require("../model/authModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "Authentication token required" });
  }

  const token = authorization.split(" ")[1];
  console.log("token-----", token);

  try {
    const { _id } = jwt.verify(token,process.env.SECRET_KEY);
    req.user = await user_model.findOne({ _id }).select("_id");
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({ error: "Request not authorized" });
  }
};

module.exports = requireAuth;
