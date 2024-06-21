
import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Modal } from 'react-bootstrap';
import '../AddBankAccount/addBankAccount.css'

export const AddBankAccount = () => {
  const [data, setData] = useState({
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    availableBalance: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');
  
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setData({ ...data, [name]: value });
  // };

  const handleContentEditableChange = (e, field) => {
    const value = e.target.textContent;
    setData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3008/api/bank/createBankAcc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      // Clear form fields
      setData({
        bankName: '',
        accountHolderName: '',
        accountNumber: '',
        availableBalance: ''
      });

      // Close modal after successful submission
      handleClose();
    } catch (error) {
     console.log(error.message || 'Something went wrong');
      setError(error.message);
    }
  };

  return (
    <Container >
      <div style={{border : "2px solid green", marginLeft: "500px",width : "500px",height : "400px",marginTop : "100px",borderRadius : "20px"}}>
    <h2 style={{ position: "absolute",
      left:" 770px",
      top: "30%"}}>Bank Details</h2>

    
    <Button   style={{ marginLeft: "22%", width: "300px",marginTop : '300px' }} variant='primary'  onClick={handleShow}> AddBankAccount</Button>
    </div>
      <Modal show={showModal} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Add Bank Account</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ width: "700px", height: "350px",marginTop : "40px" }}>
        <Form onSubmit={handleSubmit}>

          {/* Bank Name */}
          <div className='d-flex align-items-center mb-3'>
            <div style={{ padding: "13px", minWidth: "120px" }}>Bank Name:</div>
            <div
              className="horizontal-line"
              contentEditable
              onBlur={(e) => handleContentEditableChange(e, 'bankName')}
              style={{
                flex: 1,
                borderBottom: "1px solid #ddd",
                marginLeft: "20px",
                padding: "5px",
                cursor: "text"
              }}
            >
              {data.bankName}
            </div>
          </div>

          {/* Account Holder Name */}
          <div className='d-flex align-items-center mb-3'>
            <div style={{ padding: "10px", minWidth: "180px" }}>Account Holder Name:</div>
            <div
              className="horizontal-line"
              contentEditable
              onBlur={(e) => handleContentEditableChange(e, 'accountHolderName')}
              style={{
                flex: 1,
                borderBottom: "1px solid #ddd",
                marginLeft: "20px",
                padding: "5px",
                cursor: "text"
              }}
            >
              {data.accountHolderName}
            </div>
          </div>

          {/* Account Number */}
          <div className='d-flex align-items-center mb-3'>
            <div style={{ padding: "13px", minWidth: "140px" }}>Account Number:</div>
            <div
              className="horizontal-line"
              contentEditable
              onBlur={(e) => handleContentEditableChange(e, 'accountNumber')}
              style={{
                flex: 1,
                borderBottom: "1px solid #ddd",
                marginLeft: "20px",
                padding: "5px",
                cursor: "text"
              }}
            >
              {data.accountNumber}
            </div>
          </div>

          {/* Available Balance */}
          <div className='d-flex align-items-center mb-3'>
            <div style={{ padding: "16px", minWidth: "160px" }}>Available Balance:</div>
            <div
              className="horizontal-line"
              contentEditable
              onBlur={(e) => handleContentEditableChange(e, 'availableBalance')}
              style={{
                flex: 1,
                borderBottom: "1px solid #ddd",
                marginLeft: "20px",
                padding: "5px",
                cursor: "text"
              }}
            >
              {data.availableBalance}
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} style={{ padding: "10px", margin: "12px",width: "100px" }}>Close</Button>
            <Button variant="primary" type="submit" style={{ padding: "10px", margin: "12px",width: "100px" }}>Submit</Button>
          </div>

        </Form>
      </Modal.Body>
    </Modal>
    </Container>
  );
};

  

