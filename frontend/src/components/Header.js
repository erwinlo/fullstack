import React from 'react';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';

function Header() {
     return (
          <Jumbotron id='home'>
               <Container>
                    <Row>
                         <Col>
                              <h1>NUS Ledger</h1>
                              <h6>by Erwin Lo, Yeo Theng Hee and Lin Zhenyao</h6>
                         </Col>
                    </Row>
               </Container>
          </Jumbotron>
     );
}

export default Header;