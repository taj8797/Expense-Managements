import React, { useState, useEffect } from "react";
import '../bankAccount-andCard/bankAccountCard.css'
import { Container, Row, Col } from "react-bootstrap";
import { AddCards } from "../AddCards/AddCards";
import { AddCardit1 } from "../AddCards/AddCredit1";

export const BankAccountCard = () => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [bankCards, setBankCards] = useState([]);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchBankAccounts();
      fetchCards();
    }
  }, [token]);

  const fetchBankAccounts = async () => {
    try {
      const response = await fetch(
        "http://localhost:3008/api/bank/getBankAcc",
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

      setBankAccounts(result);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const fetchCards = async () => {
    try {
      const response = await fetch("http://localhost:3008/api/bank/getCard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Response is not JSON");
      }

      const resultData = await response.json();
      if (!response.ok) {
        throw new Error(resultData.message || "Failed to fetch data");
      }

      if (!Array.isArray(resultData)) {
        throw new TypeError("Expected resultData to be an array");
      }

      setBankCards(resultData);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div style={{height : "100vh"}}>
      <header className="App-header">
        <h2
          style={{ marginLeft: "300px", marginBottom: "10px", padding: "20px" }}
        >
          Bank Accounts
        </h2>
      </header>
      <main>
        <Container>
          <Row >
            {bankAccounts && bankAccounts.length > 0 ? (
              bankAccounts.map((account, index) => (
                <Col key={index} sm={4} md={4} lg={3}>
                  <AddCards account={account} />
                </Col>
              ))
            ) : (
              <p>No bank accounts available</p>
            )}
          </Row>
          <div className="grid-col">
          <h2
            style={{
              position: "absolute",
          
             marginLeft: "170px",
             
              marginTop : "120px",
               whiteSpace: "nowrap"

            }}
          >
            Card Details
          </h2>
          <Row style={{marginTop : "150px",columnGap :"250px"}}>
            {bankCards && bankCards.length > 0 ? (
              bankCards.map((card, index) => (
                <Col key={index} sm={4} md={6} lg={2} className="gap-take">
                  <AddCardit1 account={card} />
                </Col>
              ))
            ) : (
              <p>No card details available</p>
            )}
          </Row>
          </div>
        </Container>
      </main>
    </div>
  );
};
