


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

export  const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [success,setSuccess] = useState(null)
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();



    // const authenticatedEmail = localStorage.getItem('email',email);
    
    // if (email !== authenticatedEmail) {
    //   setError('You can only reset your own password.');
    //   return;
    // }

    try {
      const response = await fetch('http://localhost:3008/api/email/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email}),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "An Error occured");
        setSuccess(null)
      } else {
        setEmail("");
        localStorage.setItem('email', email);
        setTimeout(()=>  navigate('/verifyOtpEmail'),3000)
        


      }
    } catch (error) {
      console.log('error', error.message);
      setError('An unexpected error occured .Please try again later');
      setSuccess(null)
    }
  };

  return (
    <Container style={{ marginTop: "250px", border : "2px solid green",width : "400px",height :"250px" }}>
      <Row style={{marginLeft : "30px",marginTop : "35px"}}>
        <Col md={6} >
          <h2 style={{textAlign : "center",whiteSpace : "nowrap"}}>Forgot Password</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control style={{width : "300px"}}
                type="email"
                name='eamil'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Send OTP
            </Button>
          </Form>
          {success&& <Alert variant="success" className="mt-3">{success}</Alert>}
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </Col>
      </Row>
    </Container>
  );
};



