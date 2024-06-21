

import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export   const OtpVerify = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3008/api/email/verify_Otp_Email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'An error occurred');
        setMessage(null);
      } else {
        localStorage.setItem('otp', otp);
        setMessage('OTP verified successfully');
        setError(null);
        setTimeout(() => navigate('/reset-password'), 3000);
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('An unexpected error occurred. Please try again later.');
      setMessage(null);
    }
  };

  

  return (
    <Container style={{ marginTop: "250px", border : "2px solid green",width : "400px",height :"250px"  }}>
    <Row  style={{marginLeft : "30px",marginTop : "35px"}}>
      <Col md={6}>
        <h2 style={{textAlign : "center",whiteSpace : "nowrap"}}>Verify OTP</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicOtp">
            <Form.Label>OTP</Form.Label>
            <Form.Control
            style={{width : "300px"}}
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Verify OTP
          </Button>
        </Form>
        {message && <Alert variant="success" className="mt-3">{message}</Alert>}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Col>
    </Row>
  </Container>
  )
}

