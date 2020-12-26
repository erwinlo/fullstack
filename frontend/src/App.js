import React from 'react';
import './App.css';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Table from 'react-bootstrap/Table';
// import Jumbotron from 'react-bootstrap/Jumbotron';
// import Spinner from 'react-bootstrap/Spinner'
import BankAccounts from './components/BankAccounts';
import CpfAccounts from './components/CpfAccounts';
import AddAccountModal from './components/AddAccountModal';
import EditAccountModal from './components/EditAccountModal';
import DeleteAccountModal from './components/DeleteAccountModal';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bankAccounts: [],
            isLoading: true,
            userId: 1
        };
        this.bankAccounts = React.createRef();
        this.addAccModal = React.createRef();
        this.editAccModal = React.createRef();
        this.delAccModal = React.createRef();
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
                    <Row className="row-dashboard">
                        <AddAccountModal
                            ref={this.addAccModal}
                            id={this.state.userId}
                        />
                        <EditAccountModal
                            ref={this.editAccModal}
                            id={this.state.userId}
                        />
                        <DeleteAccountModal
                            ref={this.delAccModal}
                            id={this.state.userId}
                        />
                        <Col className="d-flex justify-content-center">
                            <BankAccounts
                                id={this.state.userId}
                                ref={this.bankAccounts}
                                bankAccounts={this.state.bankAccounts}
                                openAddAccModal={() => this.addAccModal.current.openModal()}
                                openEditAccModal={(data) => this.editAccModal.current.openModal(data)}
                                openDelAccModal={(data) => this.delAccModal.current.openModal(data)}
                            />
                        </Col>
                    </Row>
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