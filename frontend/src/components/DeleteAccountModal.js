import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class DeleteAccountModal extends React.Component {
    state = {
        isOpen: false,
        userId: this.props.id,
        data: {}
    };

    openModal = (d) => this.setState({ isOpen: true, data: d });
    closeModal = () => this.setState({ isOpen: false });

    onSubmit = () => {
        this.closeModal();

        let url = 'http://localhost:7000/accounts/';

        fetch(url + this.state.userId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ ac_id: this.state.data.account_id })
        })
        .then(() => this.props.reload());
    }

    render() {
        return (
            <Modal
                show={this.state.isOpen}
                onHide={this.closeModal}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Confirm deletion of this account?
                    </p>
                    <p>
                        { this.state.data.short_name + ' '
                            + this.state.data.account_type + ' '
                            + this.state.data.account_number
                        }
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.onSubmit}>
                        Delete Account
                        </Button>

                    <Button variant="secondary" onClick={this.closeModal}>
                        Cancel
                        </Button>

                </Modal.Footer>
            </Modal>
        );
    }
}