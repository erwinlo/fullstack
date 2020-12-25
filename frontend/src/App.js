import React from 'react';
import './App.css';
import * as d3 from 'd3';
import { Container, Row, Col, Jumbotron, Spinner } from 'react-bootstrap';
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Table from 'react-bootstrap/Table';
// import Jumbotron from 'react-bootstrap/Jumbotron';
// import Spinner from 'react-bootstrap/Spinner'
import BankAccounts from './components/BankAccounts'
import CpfAccounts from './components/CpfAccounts'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], isLoading: true };
    }

    callAPIServer() {
        // when component mounted, start a GET request
        // to specified URL
        fetch('http://localhost:7000/banks/1')
            // when we get a response map the body to json
            .then(response => response.json())
            // and update the state data to said json
            .then(data => {
                this.setState({
                    data: data,
                    isLoading: false
                });
                this.drawBarChart();
            });
    }

    // Draws bar chart into svg
    drawBarChart() {
        const data = [...this.state.data];
        // remove all $ and , symbols in balance
        // data.forEach((d, i, arr) => {
        //     arr[i].balance = parseFloat(d.balance.replaceAll('$', '').replaceAll(',', ''));
        // })

        // combine bank & account type as one string
        data.forEach((d, i, arr) => {
            arr[i].description = d.short_name + ' ' + d.account_type;
        })
        // set the dimensions and margins of the graph
        const margin = { top: 20, right: 20, bottom: 60, left: 150 },
            width = 600 - margin.left - margin.right,
            barHeight = 40,
            height = data.length * barHeight; // dynamically adjust height based on data

        const svg = d3.select(this.node)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform',
                'translate(' + margin.left + ',' + margin.top + ')');

        // define scale for x-axis and y-axis
        const xScale = d3.scaleLinear()
            .range([0, width])
            .domain([0, d3.max(data, d => d.balance)]);

        const yScale = d3.scaleBand()
            .range([0, height])
            .domain(data.map(d => d.description))
            .padding(0.1);


        // bars
        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', xScale(0))
            .attr('y', d => yScale(d.description))
            .attr('height', yScale.bandwidth())
            .attr('class', 'bars')
            .transition()
            .duration(1000)
            .attr('width', d => xScale(d.balance))

        // balance text
        svg.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .attr('x', d => xScale(d.balance) - 5)
            .attr('y', d => yScale(d.description) + barHeight / 2)
            .text(d => d.balance)
            .attr('class', 'balanceText');

        // add X axis
        svg.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(xScale))
            .selectAll('text')
            .attr('transform', 'translate(-10,0)rotate(-45)')
            .style('text-anchor', 'end');

        // add Y axis
        svg.append('g')
            .call(d3.axisLeft(yScale))
            .attr('font-size', '12px');

        // add axis labels
        svg.append('text')
            .text('Account Type')
            .attr('x', -(height / 2))
            .attr('y', -margin.left + 20)
            .attr('class', 'axisLabel')
            .attr('transform', 'rotate(-90)');

        svg.append('text')
            .text('Balance ($)')
            .attr('x', width / 2)
            .attr('y', height + margin.top + margin.bottom - 30)
            .attr('class', 'axisLabel');
    }

    componentDidMount() {
        this.callAPIServer();
    }

    render() {
        return (
            <Container>
                <Jumbotron>
                    <h1>NUS Ledger</h1>
                    <h6>by Erwin Lo, Yeo Theng Hee and Lin Zhenyao</h6>
                </Jumbotron>
                <Container>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            {this.state.isLoading ?
                                <span><Spinner as='span' animation='grow' size='sm' />Loading...</span>
                                :
                                <svg ref={node => this.node = node} />}
                        </Col>
                    </Row>

                    <Row>
                        <Col className="d-flex justify-content-center">
                            <BankAccounts id='1' />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <CpfAccounts id='1' />
                        </Col>
                    </Row>
                </Container>
            </Container>
        );
    }
}


export default App;