import React from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

export default class AddAccount extends React.Component {
    state = {
        isOpen: false
    };

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    render() {
        return (
            <>
                <Button variant="link" onClick={this.openModal}>
                    <i className="fas fa-plus plusButton"></i>
                </Button>
                <Modal
                    show={this.state.isOpen}
                    onHide={this.closeModal}
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            <Form.Group as={Row} controlId="institution">
                                <Form.Label column sm="4">Institution</Form.Label>
                                <Col>
                                    <Form.Control as="select">
                                        <option>Choose...</option>
                                        <option>DBS</option>
                                        <option>UOB</option>
                                        <option>OCBC</option>
                                        <option>Standard Chartered</option>
                                        <option>Citi</option>
                                        <option>HSBC</option>
                                        <option>Bank of China</option>
                                        <option>Maybank</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="accNumber">
                                <Form.Label column sm="4">Account Number</Form.Label>
                                <Col>
                                    <Form.Control type="text" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="accType">
                                <Form.Label column sm="4">Account Type</Form.Label>
                                <Col>
                                    <Form.Control as="select">
                                        <option>Choose...</option>
                                        <option>Savings</option>
                                        <option>Current</option>
                                        <option>Fixed Deposit</option>
                                        <option>Investment</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="balance">
                                <Form.Label column sm="4">Balance</Form.Label>
                                <Col>
                                    <Form.Control type="text" />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary">
                            Add Account
                        </Button>

                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}