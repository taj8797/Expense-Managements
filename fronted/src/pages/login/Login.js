import React, { useState } from "react";


import { useNavigate } from "react-router-dom";
import "../login/login.css";
import { Alert, Button, Form, FormGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../Hooks/UseAuthContext";



// import UseAuthContext from "../../Hooks/UseAuthContext";

export const Login = () => {
  const { dispatch } = useAuthContext();

  console.log("dispatch: ", dispatch);

  const navigate = useNavigate();
  const [form, setForm] = useState({
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

    const { email, password } = form;

    try {
      const response = await fetch("http://localhost:3008/api/user/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to login ");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      dispatch({ type: "LOGIN", payload: data });

      navigate("/dashboard");
    } catch (error) {
      console.log("error", error.message);
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
          <div className="parnt">
            <div className="link-style">
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "blue",
                  fontSize: "20px",
                }}
              >
                Log in
              </Link>
              /{""}
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  fontSize: "20px",
                  color: "blue",
                }}
              >
                Sign up
              </Link>
            </div>
            {/*               
            <Link to='/login'><span style={{fontSize : "20px",marginRight : "5px"}}>Log in</span></Link>/{""}
            <span className="m">
            <Link to='/register'><span style={{fontSize : "20px"}}>Sign up</span></Link>
            </span> */}
            <Form onSubmit={handleSubmit}>
              {error && <Alert variant="danger">{error}</Alert>}

              <FormGroup controlId="formBasicEmail">
                <Form.Label className="formBasicText1">Email</Form.Label>
                <Form.Control
                  className="formBasicText2"
                  style={{ width: "82%",height: "43px" ,border : "2px solid navy-blue", marginRight : "25px"}}
                  type="email"
                  name="email"
                  value={form.email}
                  placeholder="Enter email"
                  onChange={handleChange}
                />
              </FormGroup>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="formBasicText2">PASSWORD</Form.Label>
                <Form.Control
                  className="formBasicInput"
                  style={{
                    width: "80%",
                    marginLeft: "70px",
                    marginTop: "20px",
                    border : "2px solid navy-blue"

                  }}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
                <Button className="btn-login" variant="primary" type="submit">
                  {" "}
                  {/* Moved Button inside Form.Group */}
                  Log In
                </Button>
              </Form.Group>
            </Form>
            <p className="forget-design">
              <Link className="forget-design" to="/forgotPassword">
                Forgot Password
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default Login;
