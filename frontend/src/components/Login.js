import React from 'react';
import { Jumbotron, Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

const Login = ({ toggle }) => {
     const handleLogin = () => {
          toggle();
     }

     return (
          <>
               <Jumbotron>
                    <Container>
                         <Row>
                              <Col>
                                   <h1>NUS Ledger</h1>
                                   <h6>by Erwin Lo, Yeo Theng Hee and Lin Zhenyao</h6>
                              </Col>
                         </Row>
                    </Container>
               </Jumbotron>
               <Container>
                    <Row className="row-login">
                         <Col className="d-flex justify-content-center">
                              <Card border='light'>
                                   <Card.Header as='h3'>Login</Card.Header>
                                   <Card.Body>
                                        <Form>

                                             <Form.Group as={Row} controlId="email">
                                                  <Form.Label column sm="4">Email</Form.Label>
                                                  <Col>
                                                       <Form.Control />
                                                  </Col>
                                             </Form.Group>

                                             <Form.Group as={Row} controlId="password">
                                                  <Form.Label column sm="4">Password</Form.Label>
                                                  <Col>
                                                       <Form.Control />
                                                  </Col>
                                             </Form.Group>
                                        </Form>
                                        <Button onClick={() => handleLogin()}>Log in</Button>
                                   </Card.Body>
                              </Card>
                         </Col>
                    </Row>
               </Container>
          </>
     )
}

export default Login;