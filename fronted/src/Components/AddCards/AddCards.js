import React from "react";
import { Card } from "react-bootstrap";

export const AddCards = ({ account }) => {
  return (
    <Card
    style={{
      width: "300px",
      border: "2px solid tomato",
      backgroundColor: "lightgray",
      color: "black",
      marginTop : "30px",
      marginLeft: "300px",
      
     
        
      }}
    >
      <Card.Body>
        <Card.Title style={{whiteSpace :"nowrap"}}>{account.bankName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Account Holder Name
        </Card.Subtitle>
        <Card.Text>{account.accountHolderName}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">
          Account Number
        </Card.Subtitle>
        <Card.Text>{account.accountNumber}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">
          Available Balance
        </Card.Subtitle>
        <Card.Text>{account.availableBalance.toLocaleString()}</Card.Text>
      </Card.Body>
    </Card>
  );
};
