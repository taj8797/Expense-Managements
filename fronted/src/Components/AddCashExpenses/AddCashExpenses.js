import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, ListGroup,Table, Modal } from 'react-bootstrap';
import { FiEdit ,FiTrash2} from "react-icons/fi";

import '../AddCashExpenses/addCashExpenses.css'// Ensure this is the correct path to your CSS file

export  const AddCashExpenses = ({close}) => {
  const [data, setData] = useState({
    amount: '',
    date: '',
    reason: '',
  });
  const [expenses, setExpenses] = useState([]);
  const [token, setToken] = useState('');
  const [error, setError] = useState(null);
  const [currentPage , setCurrentPage] = useState(1)
  const [expensePerPage, setExpensePerPage] = useState(5)

  // Fetch the token from local storage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Fetch expenses when the component mounts or token changes
  useEffect(() => {
    if (token) {
      fetchExpenses();
    }
  }, [token ,currentPage]);  //update when token or current page changes

   const fetchExpenses = async () => {
    try {
      const response = await fetch('http://localhost:3008/api/transaction/fetchCash', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("Response is not JSON");
      }

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch expenses');
      }

      if (!Array.isArray(result.resultData)) {
        throw new TypeError("Expected resultData to be an array");
      }

      setExpenses(result.resultData);
    } catch (error) {
      console.error("Error fetching expenses:", error.message);
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3008/api/transaction/DataCashTransaction', {
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
        amount: '',
        date: '',
        reason: '',
      });
      // Add the new expense to the list
      setExpenses([...expenses, result]);
      setError(null);
      close()



      console.log('Transaction successful:', result);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  return (
  <>


          <Modal show={true} onHide={close} size='lg'>

          <Modal.Header closeButton>
        <Modal.Title>Add Expenses</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{width : "300px", height : "200px",marginTop : "90px"}}>
      
        <div className='container-Modal'>
          <div style={{width : "90%",height : "400px"}}>
   
      {/* <div className="head-cash">
        <h1 className='head-h1'>Add Cash Expenses</h1>
      </div> */}
      {error && <div className="error">{error}</div>}
      {/* <div className="form-header">
        <span>Date</span>
        <span>Reason</span>
        <span>Amount</span>
      </div> */}
   
      <form className="transaction-form" onSubmit={handleSubmit}>
      <div className='parnt-div'>
        <div className='cld-1'>
        <input
          type="date"
          name="date"
          placeholder='Date'
          value={data.date}
          onChange={handleChange}
          required
        />
        </div>
        <div className='cld-2'>
        <input
          type="text"
          name="reason"
          placeholder="Reason"
          value={data.reason}
          onChange={handleChange}
          required
        />
        </div>

         <div className='cld-3'>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={data.amount}
          onChange={handleChange}
          required
        />
        </div>
         </div>
        
        <div>
          <div style={{position :"absolute",display : "flex",top :"100px",right : "250px",}}>
        <Button variant='primary' type="submit" style={{position : "absolute", padding: "10px", marginLeft: "250px",width: "100px" }}>Submit</Button>
        <Button variant='secondary' style={{ position : "absolute",padding: "10px", marginLeft: "380px",width: "100px" }} type='close' onClick={() => close()}>Cancel</Button>
        
        </div>
        </div>
      </form>

      </div>
</div>

   
</Modal.Body>
      
    </Modal>
    </>
  );
};
      