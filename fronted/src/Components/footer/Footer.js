// src/components/Footer.js


  
  import React from 'react';
  import '../footer/footer.css'
  import { Container, Row, Col } from 'react-bootstrap';
  import {Link} from 'react-router-dom'
  
 
export const Footer = () => {
    return (
      <footer  style={{width : "1250px",border : "2px solid tomato",background : "tomato",marginTop : "370px",marginLeft : "300px",height : "200px"
      }}>
        <Container >
          <Row style={{width : "100%" ,display : "flex",justifyContent : "center",alignItems : "center",color : "white"}}>
            <Col md={3}  style={{width : "33%"}}>
              <h5>About Expense Manager</h5>
              <p>Manage your expenses effortlessly with our intuitive expense management system. Track, analyze, and control your spending all in one place.</p>
            </Col>
            <Col md={4} style={{width : "20%", marginLeft : '90px'}}>
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
      <li><Link to="/dashboard" className="text-white">Dashboard</Link></li>
      <li><Link to="/transactions" className="text-white">Transactions</Link></li>
      <li><Link to="/reports" className="text-white">Reports</Link></li>
      <li><Link to="/settings" className="text-white">Settings</Link></li>
      <li><Link to="/help" className="text-white">Help</Link></li>
    </ul>
            </Col>
            <Col md={4} style={{width : "33%" ,marginLeft : '50px'}}>
              <h5>Contact Us</h5>
              <ul className="list-unstyled">
                <li><i className="fas fa-map-marker-alt"></i> 123 Expense St, Budget City, Econ Country</li>
                <li><i className="fas fa-phone"></i> +123 456 7890</li>
                <li><i className="fas fa-envelope"></i> support@expensemanager.com</li>
              </ul>
            </Col>
          </Row>
          <Row style={{position : "absolute",top : "1610px",left : "700px"}}>
            <Col md={12} className="text-center">
              <p>&copy; 2024 Expense Manager. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  };
  

  