import React from 'react';
import './App.css';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import AccountsCard from './components/AccountsCard';
import AddAccountModal from './components/AddAccountModal';
import EditAccountModal from './components/EditAccountModal';
import DeleteAccountModal from './components/DeleteAccountModal';
import TransactionsTable from './components/TransactionsTable';
import MenuBar from './components/MenuBar';

class App extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               userId: 2,
               bankAccounts: [],
               investmentAccounts: [],
               cpfAccounts: [],
               institutions: [],
               transactions: [],
               userDetails: {},
               showAddModal: false,
               showEditModal: false,
               showDelModal: false
          };

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

     loadAccountsData() {
          this.loadBankAccounts();
          this.loadInvestmentAccounts();
          this.loadCPFAccounts();
     }

     loadInstitutions() {
          let url = 'http://localhost:7000/institutions';

          fetch(url)
               .then(response => response.json())
               .then(data => this.setState({ institutions: data }))
     }

     loadTransactions() {
          let url = 'http://localhost:7000/transactions/';

          fetch(url + this.state.userId)
               .then(response => response.json())
               .then(data => {
                    data.forEach((d, i, arr) => {
                         arr[i].date = d.date.replace('T', ' ').replace(':00.000Z', '');
                         if (arr[i].type === 'credit') {
                              arr[i].credit = d.amount;
                              arr[i].debit = null;
                         } else {
                              arr[i].debit = d.amount;
                              arr[i].credit = null;
                         }
                    })
                    this.setState({ transactions: data })
               })
     }

     loadUserDetails() {
          let url = 'http://localhost:7000/users/';

          fetch(url + this.state.userId)
               .then(response => response.json())
               .then(data => this.setState({ userDetails: data[0] }))
     }

     componentDidMount() {
          this.loadAccountsData();
          this.loadInstitutions();
          this.loadTransactions();
          this.loadUserDetails();
     }

     render() {
          return (
               <>
                    <MenuBar userId={this.state.userId}
                         userDetails={this.state.userDetails}
                         loadUser={() => this.loadUserDetails()}
                    />
                    
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
                    <Container>

                         <AddAccountModal
                              ref={this.addAccModal}
                              id={this.state.userId}
                              show={this.state.showAddModal}
                              insti={this.state.institutions}
                              reload={() => this.loadAccountsData()}
                         />
                         <EditAccountModal
                              ref={this.editAccModal}
                              id={this.state.userId}
                              show={this.state.showEditModal}
                              insti={this.state.institutions}
                              reload={() => this.loadAccountsData()}
                         />
                         <DeleteAccountModal
                              ref={this.delAccModal}
                              id={this.state.userId}
                              show={this.state.showDelModal}
                              reload={() => this.loadAccountsData()}
                         />

                         <Row className="row-header">
                              <Col>
                                   <h2>Accounts Summary</h2>
                              </Col>
                         </Row>

                         {(this.state.bankAccounts.length > 0) ?
                              <Row className="row-dashboard" id='banks'>
                                   <Col className="d-flex justify-content-center">
                                        <AccountsCard
                                             id={this.state.userId}
                                             // ref={this.bankAccounts}
                                             title='Bank Accounts'
                                             data={this.state.bankAccounts}
                                             openAddAccModal={() => this.addAccModal.current.openModal()}
                                             openEditAccModal={(data) => this.editAccModal.current.openModal(data, 'bank')}
                                             openDelAccModal={(data) => this.delAccModal.current.openModal(data)}
                                        />
                                   </Col>
                              </Row> :
                              <div></div>
                         }
                         {(this.state.investmentAccounts.length > 0) ?
                              <Row className="row-dashboard" id='investments'>
                                   <Col className="d-flex justify-content-center">
                                        <AccountsCard
                                             id={this.state.userId}
                                             title='Investment Accounts'
                                             data={this.state.investmentAccounts}
                                             openAddAccModal={() => this.addAccModal.current.openModal()}
                                             openEditAccModal={(data) => this.editAccModal.current.openModal(data, 'investment')}
                                             openDelAccModal={(data) => this.delAccModal.current.openModal(data)}
                                        />
                                   </Col>
                              </Row> :
                              <div></div>
                         }
                         {(this.state.cpfAccounts.length > 0) ?
                              <Row className="row-dashboard" id='cpf'>
                                   <Col className="d-flex justify-content-center">
                                        <AccountsCard
                                             id={this.state.userId}
                                             title='CPF Accounts'
                                             data={this.state.cpfAccounts}
                                             disableAddButton='true'
                                             openAddAccModal={() => this.addAccModal.current.openModal()}
                                             openEditAccModal={(data) => this.editAccModal.current.openModal(data, 'cpf')}
                                             openDelAccModal={(data) => this.delAccModal.current.openModal(data)}
                                        />
                                   </Col>
                              </Row> :
                              <div></div>
                         }
                         {(this.state.transactions.length > 0) ?
                              <>
                                   <Row className="row-header" id='transactions'>
                                        <Col>
                                             <h2>Transactions</h2>
                                        </Col>
                                   </Row>
                                   <Row className="row-dashboard">
                                        <Col className="d-flex justify-content-center">
                                             <TransactionsTable
                                                  data={this.state.transactions}
                                             />
                                        </Col>
                                   </Row>
                              </>
                              : <div></div>
                         }
                    </Container>
               </>
          );
     }
}


export default App;