import React from 'react';
import Card from 'react-bootstrap/Card';


 export const UpiCard = ({ account }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Transaction Details</Card.Title>
        <Card.Text>
          <p><strong>Type: </strong> {account.type}</p>
          <p><strong>Amount:</strong> {account.amount}</p>
          <p><strong>Description:</strong> {account.description}</p>
          <p><strong>Merchant:</strong> {account.merchant}</p>
          <p><strong>Category:</strong> {account.category}</p>
          <p><strong>Status:</strong> {account.status}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};


