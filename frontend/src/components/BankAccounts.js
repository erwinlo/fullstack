import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import DonutChart from './DonutChart';
import AddAccount from './AddAccount'

export default class BankAccounts extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true,
            total: 0
        }
    }

    transformData(data) {
        const color = ['#4cd964', '#007aff', '#ff3b30', '#ffcc00', '#ff9500', '#5856d6', '#ff2d55'];
        let total = 0;

        data.forEach((d, i, arr) => {
            arr[i].account_type = d.account_type.replaceAll('_', ' '); // replace underscore with space
            arr[i].value = d.balance;
            arr[i].color = color[i];

            total += d.balance;
        });

        this.setState({ total: total });

        return data;
    }

    callAPIServer() {
        // when component mounted, start a GET request
        // to specified URL
        fetch('http://localhost:7000/banks/' + this.props.id)
            // when we get a response map the body to json
            .then(response => response.json())
            // and update the state data to said json
            .then(data => this.transformData(data))
            .then(data => {
                this.setState({
                    data: data,
                    isLoading: false
                });
            });
    }

    componentDidMount() {
        this.callAPIServer();
    }

    render() {
        // Create our money formatter.
        const money = new Intl.NumberFormat('en-SG', {
            style: 'currency',
            currency: 'SGD'
        });

        return (
            <Card border="light">
                <Card.Header className="d-flex align-items-center">
                    <h3 className="mr-auto">Bank Accounts</h3>
                    <AddAccount />
                </Card.Header>
                <Card.Body>
                    <Container>
                        <Row className="row-card d-flex align-items-center justify-content-center">
                            <Col sm={3} md={4}>
                                <DonutChart data={this.state.data} /> 
                            </Col>
                            <Col>
                                <Table striped borderless hover responsive>
                                    <thead className="font-weight-bolder">
                                        <tr>
                                            <td>Bank</td>
                                            <td>Account Type</td>
                                            <td>Account Number</td>
                                            <td className="text-right">Balance</td>
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
                                                        <td className="text-capitalize"> {item.account_type}  </td>
                                                        <td> {item.account_number}  </td>
                                                        <td className="text-right">
                                                            {money.format(item.balance)}
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                            )}
                                    </tbody>
                                    <tfoot>
                                        <tr className="text-right">
                                            <td colspan='3'>
                                                <h4>Total</h4>
                                            </td>
                                            <td>
                                                <h4>{money.format(this.state.total)}</h4>
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