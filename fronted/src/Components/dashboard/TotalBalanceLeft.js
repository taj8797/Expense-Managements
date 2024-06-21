

import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../transaction/transaction.css'
export const  TotalBalanceLeft = () => {
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
          <div style={{ display : 'flex', backgroundColor: '#f0f0f0', padding: '20px', textAlign: 'start', width : "370px",  marginTop: "100px",height : "200px",border : "2px solid tomato" ,display : "inline-block" ,marginLeft : "60px"}}>
            <h4 > Balance left</h4>
            {error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : ( 
              <>
                <h1 style={{marginTop : "10px"}}>₹{totalBalance}</h1>
                <p style={{marginTop : "2rem",fontSize : "20px"}}>included all the bank balance</p>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};


