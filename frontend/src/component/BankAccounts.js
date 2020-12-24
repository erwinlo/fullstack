import React from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';

export default class BankAccounts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true
        }
    }

    transformData(data) {
        data.forEach((d, i, arr) => {
            arr[i].account_type = d.account_type.replaceAll('_', ' '); // replace underscore with space
        });

        return data;
    }

    callAPIServer() {
        // when component mounted, start a GET request
        // to specified URL
        fetch('http://localhost:7000/banks/' + this.props.id)
            // when we get a response map the body to json
            .then(response => response.json())
            // and update the state data to said json
            .then(data => this.transformData(data) )
            .then(data => {
                this.setState({
                    data: data,
                    isLoading: false
                });
                //this.drawBarChart();
            });
    }

    componentDidMount() {
        this.callAPIServer();
    }

    render() {
        return (
            <Card border="light" style={{ width: '30rem' }}>
                <Card.Header as="h3">Bank Accounts</Card.Header>
                <Card.Body>
                    <Table striped borderless hover>
                        <thead>
                            <tr>
                                <td>Bank</td>
                                <td>Account Type</td>
                                <td>Account Number</td>
                                <td>Balance</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.isLoading ?
                                <tr>
                                    <td colspan='3'>
                                        <span><Spinner as='span' animation='grow' size='sm' />Loading...</span>
                                    </td>
                                </tr>
                                :
                                (this.state.data).map((item) => {
                                    return (
                                        <tr key={item.account_number}>
                                            <td> {item.short_name} </td>
                                            <td> {item.account_type}  </td>
                                            <td> {item.account_number}  </td>
                                            <td> {item.balance}  </td>
                                        </tr>
                                    )
                                }
                                )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}