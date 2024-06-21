

import React, { useEffect, useState } from 'react';

import { Form, Button } from 'react-bootstrap';
import '../transaction/AddTransaction.css';

export  const AddTransaction = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState(null);
  const [banks, setBanks] = useState([]);
  const [form, setForm] = useState({
    type: 'UPI',
    amount: '',
    date : '',
    description: '',
    merchant: '',
    category: '',
  
   
    
  
    bankId: '' // Adding bankId to form state
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []); // Empty dependency array ensures this runs only once on component mount

  useEffect(() => {
    if (token) {
      fetchBanks();
    }
  }, [token]);

  const fetchBanks = async () => {
    try {
      const response = await fetch('http://localhost:3008/api/bank/getBankAcc', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bank accounts');
      }

      const data = await response.json();
      setBanks(data);
    } catch (error) {
      console.error('There was an error fetching the bank accounts!', error);
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3008/api/transactionUpi/CreateTransaction', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to add transaction');
      }

      setForm({
        type: 'UPI',
        amount: '',
        date : "",
        description: '',
        merchant: '',
        category: '',
       
      

        bankId: '',
      
      });

    } catch (error) {
  console.log(error.message);
      setError(error.message);
    }
  }

  return (
   
    <Form onSubmit={handleSubmit} className="my-form">
    <h3>Add Transaction</h3>
    <p>Add a transaction for reconciliation or for manually tracked accounts.</p>
    
    <Form.Group controlId="type">
      <Form.Label>Type:</Form.Label>
      <Form.Control
        as="select"
        name="type"
        value={form.type}
        onChange={handleChange}
        required
      >

        <option value ="">Select Type</option>
        <option value ="UPI">UPI</option>
        <option value ="CreditCard">CreditCard</option>
        <option value ="DebitCard">DebitCard</option>
        </Form.Control>





    </Form.Group>

    <Form.Group controlId="amount">
      <Form.Label>Amount:</Form.Label>
      <Form.Control
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        required
      />
    </Form.Group>

    <Form.Group controlId="date">
      <Form.Label>Date:</Form.Label>
      <Form.Control
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />
    </Form.Group>

    <Form.Group controlId="description">
      <Form.Label>Description:</Form.Label>
      <Form.Control
        type="text"
        name="description"
        value={form.description}
        onChange={handleChange}
        required
      />
    </Form.Group>

    <Form.Group controlId="merchant">
      <Form.Label>Merchant:</Form.Label>
      <Form.Control
        type="text"
        name="merchant"
        value={form.merchant}
        onChange={handleChange}
        required
      />
    </Form.Group>

    <Form.Group controlId="category">
      <Form.Label>Category:</Form.Label>
      <Form.Control
        as="select"
        name="category"
        value={form.category}
        onChange={handleChange}
        required
      >

        <option value ="">Select Category</option>
        <option value ="food">Food</option>
        <option value ="health">Travel</option>
        <option value ="Entertainment">Entertainment</option>
        <option value ="Shopping">Shopping</option>
        <option value ="Others">Others</option>
        </Form.Control>
    </Form.Group>

   

    <Form.Group controlId="bankId">
      <Form.Label>Bank Name:</Form.Label>
      <Form.Control
        as="select"
        name="bankId"
        value={form.bankId}
        onChange={handleChange}
        required
      >
        <option value="">Select Bank</option>
        {banks && banks.length > 0 && banks.map((bank) => (
          <option key={bank._id} value={bank._id}>
            {bank.bankName}
          </option>
        ))}
      </Form.Control>
    </Form.Group>

    <Button variant="primary" type="submit" className="btn-block mt-4">
      Add Transaction
    </Button>
   

    {error && <p style={{ color: 'red' }}>{error}</p>}
  </Form>
 
  );
}

