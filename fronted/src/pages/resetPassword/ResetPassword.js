import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import  {resetPassword} from '../resetPassword/resetPassword.css'







export const ResetPassword = () => {
 
  const {id} = useParams()
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
 



  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email')
    if(!token || !email){
      setMessage('user is not authenticated')
      return 
    }
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      console.log('Submitting password reset request...');
      const response = await fetch(`http://localhost:3008/api/email/reset_Password/${email}`,{
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword, confirmPassword }),
      });
      
      const data = await response.json();
  
      if (!response.ok) {
        setMessage(data.error);
        return;
      } else {
        setMessage(data.message);
        // Avoid storing passwords in localStorage
        localStorage.setItem('token', token);
        // setTimeout(() => navigate('/login'), 3000);
        navigate('/')
      }
    } catch (error) {
      console.error('Error occurred during password reset:', error);
      setMessage('An error occurred while resetting the password');
    }
  };




    return (
      <Container className="reset-container">
        <Row className='reset-col'>
          <Col md={6} style={{marginLeft : "350px",marginTop : "130px"}} >
            <h2 className="h2-basic text-center">Reset Password</h2>
            <Form className="form-design" onSubmit={handleSubmit}>
              <Form.Group controlId="formNewPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control className='input-set'
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control className='input-set'
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                />
              </Form.Group>
              <Button className="btn-design" variant="primary" type="submit">
                Reset Password
              </Button>
            </Form>
            {message && (
              <Alert variant={message === 'Passwords do not match' ? 'danger' : 'success'} className="mt-3">
                {message}
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    );
};

