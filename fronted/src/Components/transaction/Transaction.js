

import React, { useState, useEffect } from "react";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import { TotalBankBalance } from "./TotalBankBalance";
import { TransactionPieChart } from "./TransactionPieChart";
import '../transaction/FetchTransaction.css';

export const Transaction = () => {
  const [upiTransactions, setUpiTransactions] = useState([]);
  const [creditTransactions, setCreditTransactions] = useState([]);
  const [debitTransactions, setDebitTransactions] = useState([]);

  const [upiError, setUpiError] = useState(null);
  const [creditError, setCreditError] = useState(null);
  const [debitError, setDebitError] = useState(null);

  const [upiPage, setUpiPage] = useState(0);
  const [creditPage, setCreditPage] = useState(0);
  const [debitPage, setDebitPage] = useState(0);

  const rowsPerPage = 2; // Number of rows per page
  const token = localStorage.getItem("token");

  const fetchTransactions = async (type, page, setTransactions, setError) => {
    try {
      const response = await fetch(
        `http://localhost:3008/api/transactionUpi/fetchTransactionByType/${type}?page=${page}&limit=${rowsPerPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Response is not JSON");
      }

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch data");
      }

      if (!Array.isArray(result)) {
        throw new TypeError("Expected result to be an array");
      }

      setTransactions(result);
      setError(null);
    } catch (error) {
    console.log("error",error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTransactions('UPI', upiPage, setUpiTransactions, setUpiError);
    }
  }, [token, upiPage]);

  useEffect(() => {
    if (token) {
      fetchTransactions('CreditCard', creditPage, setCreditTransactions, setCreditError);
    }
  }, [token, creditPage]);

  useEffect(() => {
    if (token) {
      fetchTransactions('DebitCard', debitPage, setDebitTransactions, setDebitError);
    }
  }, [token, debitPage]);

  const loadPrevious = (page, setPage) => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const loadNext = (page, setPage, transactions) => {
    if (transactions.length === rowsPerPage) {
      setPage(page + 1);
    }
  };

  return (
    <>
        <h1 style={{ position : "absolute" , left : "25%",top : "22px"}}>Transaction </h1>
    <>
   
    <div className="container"><TotalBankBalance />
    

   <TransactionPieChart /></div>

    </>


    
   
    


      <div>
       
      <main>
            <Container className="upi-container">
                <h3 className="upi-head">Transactions through UPI</h3>
                <Row >
                    <Col style={{width : "800px",height : "150px",marginLeft : "420px",marginTop : "100px"
                    }}>
                        {/* {upiError && <p className="error">{upiError}</p>} */}
                        {upiTransactions.length > 0 ? (
                            <>
                                <Table striped bordered hover className="transaction-table1">
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>Amount</th>
                                            <th>Description</th>
                                            <th>Merchant</th>
                                            <th>Category</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {upiTransactions.map((account, index) => (
                                            <tr key={index}>
                                                <td>{account.type}</td>
                                                <td>{account.amount}</td>
                                                <td>{account.description}</td>
                                                <td>{account.merchant}</td>
                                                <td>{account.category}</td>
                                                <td>{account.date}</td>
                                                <td>{account.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <div className="pagination">
                                    <Button variant="outline-secondary" onClick={() => loadPrevious(upiPage, setUpiPage)} disabled={upiPage === 0}>
                                        &#x2190; Previous
                                    </Button>
                                    <Button variant="outline-secondary" onClick={() => loadNext(upiPage, setUpiPage, upiTransactions)} style={{ marginLeft: '10px' }}>
                                        Next &#x2192;
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <p>No transactions found.</p>
                        )}
                    </Col>
                </Row>
            </Container>
        </main>
 





      </div>

      <div>
      <main>
            <Container className="credit-container">
                <h3 className="credit-head">
                    Transactions through Credit Card
                </h3>
                <Row style={{width : "800px",marginTop : "200px",marginLeft : "400px"}}>
                    <Col>
                        {/* {creditError && <p className="error">{creditError}</p>} */}
                        {creditTransactions.length > 0 ? (
                            <>
                                <Table striped bordered hover className="transaction-table1">
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>Amount</th>
                                            <th>Description</th>
                                            <th>Merchant</th>
                                            <th>Category</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {creditTransactions.map((account, index) => (
                                            <tr key={index}>
                                                <td>{account.type}</td>
                                                <td>{account.amount}</td>
                                                <td>{account.description}</td>
                                                <td>{account.merchant}</td>
                                                <td>{account.category}</td>
                                                <td>{account.date}</td>
                                                <td>{account.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <div className="pagination">
                                    <Button variant="outline-secondary" onClick={() => loadPrevious(creditPage, setCreditPage)} disabled={creditPage === 0}>
                                        &#x2190; Previous
                                    </Button>
                                    <Button variant="outline-secondary" onClick={() => loadNext(creditPage, setCreditPage, creditTransactions)} style={{ marginLeft: '10px' }}>
                                        Next &#x2192;
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <p>No transactions found.</p>
                        )}
                    </Col>
                </Row>
            </Container>
        </main>
      </div>

      <div>
      <main>
            <Container className="debit-container">
                <h3 className="debit-head">
                    Transactions through Debit Card
                </h3>
                <Row style={{marginLeft : "400px",width : "800px",height :"100px",marginTop :"150px",marginBottom :'30px'}}>
                    <Col>
                        {/* {debitError && <p className="error">{debitError}</p>} */}
                        {debitTransactions.length > 0 ? (
                            <>
                                <Table striped bordered hover className="transaction-table">
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>Amount</th>
                                            <th>Description</th>
                                            <th>Merchant</th>
                                            <th>Category</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {debitTransactions.map((account, index) => (
                                            <tr key={index}>
                                                <td>{account.type}</td>
                                                <td>{account.amount}</td>
                                                <td>{account.description}</td>
                                                <td>{account.merchant}</td>
                                                <td>{account.category}</td>
                                                <td>{account.date}</td>
                                                <td>{account.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <div className="pagination">
                                    <Button variant="outline-secondary" onClick={() => loadPrevious(debitPage, setDebitPage)} disabled={debitPage === 0}>
                                        &#x2190; Previous
                                    </Button>
                                    <Button variant="outline-secondary" onClick={() => loadNext(debitPage, setDebitPage, debitTransactions)} style={{ marginLeft: '10px' }}>
                                        Next &#x2192;
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <p>No transactions found.</p>
                        )}
                    </Col>
                </Row>
            </Container>
        </main>
      </div>
    </>
  );
};
