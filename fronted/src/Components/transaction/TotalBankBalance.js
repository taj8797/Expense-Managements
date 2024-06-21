import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../transaction/transaction.css'
export const  TotalBankBalance = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchTotalBalance = async () => {
      try {
        const response = await fetch('http://localhost:3008/api/bank/getBankBalance', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch balance');
        }

        const data = await response.json();
        setTotalBalance(data.AvailableBalance);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    fetchTotalBalance();
  }, []);

  return (
    <Container>
      <Row className=" total-balance">
        <Col xs={6} md={6}>
          <div style={{ display : 'flex', backgroundColor: '#f0f0f0', padding: '20px', textAlign: 'start', width : "130%",marginTop : "10rem" ,height : "18rem",border : "2px solid tomato" ,display : "inline-block" ,marginRight : "13rem" ,marginLeft : "250px"}}>
            <h4 >Available Balance</h4>
            {error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : (
              <>
                <h1 style={{marginTop : "2rem"}}>₹{totalBalance}</h1>
                <p style={{marginTop : "4rem",fontSize : "20px"}}>All the bank accounts included</p>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};


