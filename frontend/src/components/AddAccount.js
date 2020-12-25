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
                            
                            <Form.Group as={Row} controlId="Bank">
                                <Form.Label column sm="3">Bank</Form.Label>
                                <Col sm="8">
                                <Form.Control as="select">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}