import React, { useEffect, useState } from "react";

import "../VerifyOtp/verifyOtp.css";
import { useNavigate } from "react-router-dom";
import { Alert, Form, Button } from "react-bootstrap";

export const VerifyOtp = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  // useEffect(() => {
  //   const storedToken= localStorage.getItem('token');

  //   console.log("storedToken ====",storedToken)

  //   if (storedToken) {
  //     setToken(storedToken);
  //   } else {
  //     setError('Invalid Token, please sign up first.');
  //   }
  // }, []);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("otp:", otp);

    // if (!token) {
    //   setError('Please sign up first.');
    //   return;
    // }

    try {
      const response = await fetch("http://localhost:3008/api/user/verifyOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        console.log(error);
        return;
      }
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div
        className="row"
        style={{
          marginTop: 125,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <div
          className="col-md-5 bg-dark border border-danger "
          style={{
            width: "600px",
            height: "550px",
            borderRadius: 10,
            marginBottom: "200px",
          }}
        >
          <div
            className="border border-primary"
            style={{
              width: 300,
              height: 250,
              borderRadius: 40,
              backgroundColor: "white",
              marginTop: "70px",
              textAlign: "center",
              marginLeft: "150px",
            }}
          ></div>

          <h1
            className="text-white"
            style={{ marginTop: "30px", marginLeft: "15px" }}
          >
            Expense management
          </h1>

          <span className="custom-icon1"></span>
          <span className="custom-icon2"></span>
          <span className="custom-icon3"></span>
        </div>

        <div
          className="col-md-5   border border-dark rounded"
          style={{ width: "600px", height: "550px", marginBottom: "200px" }}
        >
          <h2 className="head-design">Verify your account</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formOtp">
              <Form.Label className="otp-set">OTP</Form.Label>
              <Form.Control
                type="text"
                name="otp"
                value={otp}
                onChange={handleChange}
                className="p-3 border border-primary "
                placeholder="Enter OTP here"
              />
            </Form.Group>
            <span className="span-design1"></span>
            <span className="span-design2"></span>
            <span className="span-design3"></span>
            <button className="btn-style">Submit</button>
          </Form>
          {/* <div className="resend-otp-link">
        Didn't receive an OTP? <Link to="/resendOtp">Resend OTP</Link>
      </div> */}
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
