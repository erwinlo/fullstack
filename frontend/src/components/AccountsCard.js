import React from 'react';
import { Card, Container, Row, Col, Table, ButtonGroup, Button } from 'react-bootstrap';
import DonutChart from './DonutChart';

export default class AccountsCard extends React.Component {

     render() {
          // Create our money formatter.
          const money = new Intl.NumberFormat('en-SG', {
               style: 'currency',
               currency: 'SGD'
          });

          // calculate total value
          const total = this.props.data.reduce((s, d) => s + d.balance, 0);

          return (
               <Card border='light'>
                    <Card.Header className='d-flex align-items-center'>
                         <h3 className='mr-auto'>{this.props.title}</h3>
                         {(this.props.disableAddButton) ?
                              <span></span> :
                              <Button variant='link' className='fas fa-plus plusButton btn-card'
                                   onClick={this.props.openAddAccModal} />
                         }
                    </Card.Header>
                    <Card.Body>
                         <Container>
                              <Row className='row-card d-flex align-items-center justify-content-center'>
                                   <Col sm={3} md={4}>
                                        <DonutChart data={this.props.data} />
                                   </Col>
                                   <Col>
                                        <Table striped borderless hover responsive>
                                             <thead className='font-weight-bolder'>
                                                  <tr>
                                                       <td>Institution</td>
                                                       <td>Account Type</td>
                                                       <td>Account Number</td>
                                                       <td className='text-right'>Balance</td>
                                                       <td></td>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {
                                                       (this.props.data).map((item, index) => {
                                                            return (
                                                                 <tr key={item.account_id}>
                                                                      <td> {item.short_name} </td>
                                                                      <td className='text-capitalize'> {item.account_type}  </td>
                                                                      <td> {item.account_number}  </td>
                                                                      <td className='text-right'>
                                                                           {money.format(item.balance)}
                                                                      </td>
                                                                      <td className='pl-0 pr-0'>
                                                                           <ButtonGroup>
                                                                                <Button variant='link'
                                                                                     className='fas fa-pencil-alt btn-card btn-row'
                                                                                     onClick={() => this.props.openEditAccModal(this.props.data[index])}
                                                                                />
                                                                                <Button variant='link'
                                                                                     className='far fa-trash-alt btn-card btn-row'
                                                                                     onClick={() => this.props.openDelAccModal(this.props.data[index])}
                                                                                />
                                                                           </ButtonGroup>
                                                                      </td>
                                                                 </tr>
                                                            )
                                                       })
                                                  }
                                             </tbody>
                                             <tfoot>
                                                  <tr className='text-right'>
                                                       <td colSpan='3'>
                                                            <h4>Total</h4>
                                                       </td>
                                                       <td>
                                                            <h4>{money.format(total)}</h4>
                                                       </td>
                                                  </tr>
                                             </tfoot>
                                        </Table>
                                   </Col>
                              </Row>
                         </Container>
                    </Card.Body>
               </Card>
          );
     }
}