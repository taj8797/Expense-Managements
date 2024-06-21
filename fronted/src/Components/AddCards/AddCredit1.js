
import React from "react";
import { Card, Col, Row } from "react-bootstrap";


export const AddCardit1 = ({ account}) => {

    return (
      <Card
        style={{
          position : "relative",
          width: "300px",
          height : "350",
          border: "2px solid tomato",
          backgroundColor: "lightgray",
          color: "black",
          marginTop : "40px",
          marginLeft: "250px",
          rowGap : "200px",
          
        }}
      >
      <Card.Body >
        <Card.Title>{account.cardName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
        
        </Card.Subtitle>

        <Card.Text>{account.cardNumber}</Card.Text>
      
      
        
        <Card.Subtitle className="mb-2 text-muted">
        Issued Date
        </Card.Subtitle>

        <Card.Text>{new Date(account.issueddate).toLocaleDateString()}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">
        Expiry Date
        </Card.Subtitle>

        <Card.Text>{new Date(account.expirydate).toLocaleDateString()}</Card.Text>
    


        
          
            <Card.Subtitle className="mb-2 text-muted">
              Account Holder Name
            </Card.Subtitle>
            <Card.Text>{account.accountHolderName}</Card.Text>
          

        
         
        {/* <Card.Subtitle className="mb-2 text-muted">
         
        </Card.Subtitle> */}
      </Card.Body>
    </Card>
  );
};