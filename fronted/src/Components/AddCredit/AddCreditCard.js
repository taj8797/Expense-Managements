import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Modal ,Row,Col} from 'react-bootstrap';


 export  const AddCreditCard = () => {

  const [creditCard , setCreditCard] = useState({
    cardName : "",
    cardNumber : "",
    issueddate : "",
    expirydate : "",
    accountHolderName : ""
   

  })

  const [showModal ,setShowModal] = useState(false)
  const [error , setError] = useState(null)
  const [token, setToken]   = useState('')

  const handleClose = () => setShowModal(false)
  const handleShow  = () => setShowModal(true)

  useEffect(() => {

    const storedToken = localStorage.getItem('token')
    if(storedToken){
      setToken(storedToken)

    }
  },[])

  const handleChange = (e) => {
    const {name , value } = e.target;
    setCreditCard({...creditCard, [name] : value})
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const response = await fetch('http://localhost:3008/api/bank/createCard',{
       
      method : "POST",
      headers :{ "Content-Type": 'application/json',
      'Authorization' : `Bearer ${token}`,
    },



    body : JSON.stringify(creditCard),

    })

    const result = await response.json()
    
    if(!response.ok){
      throw new Error(result.message || 'Something went wrong')
    }


    setCreditCard({

      cardName : "",
      cardNumber : "",
      issueddate : "",
      expirydate : "",
      accountHolderName : "",


    })

    // close modal after successfull submission 
    handleClose();

    }catch(error){
      console.log("error===",error.message);
      setError(error.message || '')
    }
  }


  return (

    <Container >
      <div style={{border : "2px solid green", marginLeft: "500px",width : "500px",height : "400px",marginTop : "100px",borderRadius : "20px"}}>
    <h2 style={{ position: "absolute",
      left:" 770px",
      top: "30%"}}>Cards Details</h2>

    
    <Button   style={{ marginLeft: "22%", width: "300px",marginTop : '300px' }} variant='primary'  onClick={handleShow}>Add Cards</Button>
    </div>
    <Modal show={showModal} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Add Cards</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ width: "500px", height: "700px" }}>
      <img src='./images/CreditCard.jpg' alt="CreditCard" style={{ width: '400px', height: '200px',marginLeft : "150px",borderRadius : "40px",marginTop : "30px",  }} />
      <Form onSubmit={handleSubmit}>
          <Row style={{marginTop : "80px",marginLeft : "80px",width : "600px"}}>
            <Col md={6}>
              <Form.Group controlId="formCardName">
                <Form.Label>Card Name</Form.Label>
                <Form.Control
                  type="text"
                  name="cardName"
                  value={creditCard.cardName}
                  onChange={handleChange}
                  placeholder="Enter bank name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCardNumber">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  name="cardNumber"
                  value={creditCard.cardNumber}
                  onChange={handleChange}
                  placeholder="Enter card number"
                  required
                />
              </Form.Group>
            </Col>
          </Row>


          <Row  style={{marginLeft : "80px",width : "600px"}}>
          <Col md={6}>
          <Form.Group controlId="formAccountNumber">
            <Form.Label style={{ padding: "10px" }}>Issue Date</Form.Label>
            <Form.Control
              type="date"
              name="issueddate"
              value={creditCard.issueddate}
              onChange={handleChange}
              placeholder="Enter account number"
              required
            />
          </Form.Group>
          </Col>

          <Col md={6}>

          <Form.Group controlId="formAvailableBalance">
            <Form.Label style={{ padding: "10px" }}>Expire Date</Form.Label>
            <Form.Control
              type="date"
              name="expirydate"
              value={creditCard.expirydate}
              onChange={handleChange}
              placeholder="Enter available balance"
              required
            />
          </Form.Group>

          </Col>
          </Row>
          
          <Row  style={{marginLeft : "80px",width : "600px"}}>
            <Col md={6}>
    
          <Form.Group controlId="formAvailableBalance">
            <Form.Label style={{ padding: "10px" }}>Account Holder Name</Form.Label>
            <Form.Control
              type="text"
              name="accountHolderName"
              value={creditCard.accountHolderName}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
          </Form.Group>

        </Col>
        </Row>

          <Button variant="secondary" onClick={handleClose} style={{ padding: "10px", marginLeft: "180px" ,width : "200px",marginTop : "30px"}}>Close</Button>
          <Button variant="primary" type="submit" style={{position : "absolute", padding: "10px", marginLeft: "13px" ,marginTop : "30px",width : "200px"}}>Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  </Container>
    
    
  )
}

