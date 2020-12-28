import React from 'react';
import './App.css';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import AccountsCard from './components/AccountsCard';
import CpfAccounts from './components/CpfAccounts';
import AddAccountModal from './components/AddAccountModal';
import EditAccountModal from './components/EditAccountModal';
import DeleteAccountModal from './components/DeleteAccountModal';


class App extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               userId: 2,
               bankAccounts: [],
               investmentAccounts: [],
               cpfAccounts: [],
               showAddModal: false,
               showEditModal: false,
               showDelModal: false
          };
          // this.bankAccounts = React.createRef();
          this.addAccModal = React.createRef();
          this.editAccModal = React.createRef();
          this.delAccModal = React.createRef();
     }

     loadBankAccounts() {
          let url = 'http://localhost:7000/banks/';

          fetch(url + this.state.userId)
               .then(response => response.json())
               .then(data => this.setState({ bankAccounts: data }))
     }

     loadInvestmentAccounts() {
          let url = 'http://localhost:7000/investments/';

          fetch(url + this.state.userId)
               .then(response => response.json())
               .then(data => this.setState({ investmentAccounts: data }))
     }

     loadCPFAccounts() {
          let url = 'http://localhost:7000/cpf/';

          fetch(url + this.state.userId)
               .then(response => response.json())
               .then(data => this.setState({ cpfAccounts: data }))
     }

     loadAllData() {
          this.loadBankAccounts();
          this.loadInvestmentAccounts();
          this.loadCPFAccounts();
     }

     componentDidMount() {
          this.loadAllData();
     }

     render() {
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

                         <AddAccountModal
                              ref={this.addAccModal}
                              id={this.state.userId}
                              show={this.state.showAddModal}
                              reload={() => this.loadAllData()}
                         />
                         <EditAccountModal
                              ref={this.editAccModal}
                              id={this.state.userId}
                              show={this.state.showEditModal}
                              reload={() => this.loadAllData()}
                         />
                         <DeleteAccountModal
                              ref={this.delAccModal}
                              id={this.state.userId}
                              show={this.state.showDelModal}
                              reload={() => this.loadAllData()}
                         />

                         {(this.state.bankAccounts.length > 0) ?
                              <Row className="row-dashboard">
                                   <Col className="d-flex justify-content-center">
                                        <AccountsCard
                                             id={this.state.userId}
                                             // ref={this.bankAccounts}
                                             title='Bank Accounts'
                                             data={this.state.bankAccounts}
                                             openAddAccModal={() => this.addAccModal.current.openModal()}
                                             openEditAccModal={(data) => this.editAccModal.current.openModal(data)}
                                             openDelAccModal={(data) => this.delAccModal.current.openModal(data)}
                                        />
                                   </Col>
                              </Row> :
                              <div></div>
                         }
                         {(this.state.investmentAccounts.length > 0) ?
                              <Row className="row-dashboard">
                                   <Col className="d-flex justify-content-center">
                                        <AccountsCard
                                             id={this.state.userId}
                                             title='Investment Accounts'
                                             data={this.state.investmentAccounts}
                                             openAddAccModal={() => this.addAccModal.current.openModal()}
                                             openEditAccModal={(data) => this.editAccModal.current.openModal(data)}
                                             openDelAccModal={(data) => this.delAccModal.current.openModal(data)}
                                        />
                                   </Col>
                              </Row> :
                              <div></div>
                         }
                         {(this.state.cpfAccounts.length > 0) ?
                              <Row className="row-dashboard">
                                   <Col className="d-flex justify-content-center">
                                        <AccountsCard
                                             id={this.state.userId}
                                             title='CPF Accounts'
                                             data={this.state.cpfAccounts}
                                             openAddAccModal={() => this.addAccModal.current.openModal()}
                                             openEditAccModal={(data) => this.editAccModal.current.openModal(data)}
                                             openDelAccModal={(data) => this.delAccModal.current.openModal(data)}
                                        />
                                   </Col>
                              </Row> :
                              <div></div>
                         }
                         <Row className="row-dashboard">
                              <Col className="d-flex justify-content-center">
                                   <CpfAccounts id={this.state.userId} />
                              </Col>
                         </Row>
                    </Container>
               </>
          );
     }
}


export default App;