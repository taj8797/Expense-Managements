import React, { useState } from "react";

import "../register/register.css";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";

export const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userName, email, password } = form;

    try {
      const response = await fetch("http://localhost:3008/api/user/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      // localStorage.setItem("token", data.token);
      navigate("/verifyOtp");
    } catch (error) {
      console.log("error---", error.message);
      setError("Something went wrong");
    }
  };

  return (
    <div className="container">
      {error && (
        <Alert
          variant="danger"
          style={{
            width: "30%",
            height: "40px",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "40%",
            marginTop: "40x",
            paddingBottom: "20px",
          }}
        >
          {error}
        </Alert>
      )}

      <div
        className="row1"
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
              width: "350px",
              height: 250,
              borderRadius: 40,
              backgroundColor: "white",
              marginTop: "70px",
              textAlign: "center",
              marginLeft: "120px",
            }}
          ></div>

          <h1
            className="text-white"
            style={{ marginTop: "60px", marginLeft: "15px" }}
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
          <div className="head-section">
            <Link to="/">Login</Link> /{" "}
            <Link to="/register">Register</Link>
          </div>
          <Form className="form-setup" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="userName">
              <Form.Label className="label-form2">UserName</Form.Label>
              <Form.Control
                className="input-design"
                type="text"
                name="userName"
                value={form.userName}
                placeholder="User Name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="lable-form1">Email</Form.Label>
              <Form.Control
                className="input-design"
                type="email"
                name="email"
                value={form.email}
                placeholder="Enter email"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="lable-form3">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={form.password}
                name="password"
                onChange={handleChange}
                className="input-design"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="sumbit-form">
              Sign Up
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
