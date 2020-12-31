import React from 'react';
import { useTable, usePagination } from 'react-table';
import { Card, Container, Row, Col, Table, Pagination, Form } from 'react-bootstrap';

const TransactionsTable = (props) => {
     const columns = React.useMemo(
          () => [
               {
                    Header: "Date",
                    accessor: "date",
               },
               {
                    Header: "Institution",
                    accessor: "short_name",
               },
               {
                    Header: "Account Type",
                    accessor: "account_type",
               },
               {
                    Header: "Account Number",
                    accessor: "account_number",
               },
               {
                    Header: "Credit",
                    accessor: "credit",
                    Cell: props => (props.value) ? money.format(props.value) : props.value,
               },
               {
                    Header: "Debit",
                    accessor: "debit",
                    Cell: props => (props.value) ? money.format(props.value) : props.value,
               },
          ],
          []
     )

     const data = React.useMemo(() => [...props.data], [])

     const money = new Intl.NumberFormat('en-SG', {
          style: 'currency',
          currency: 'SGD'
     });

     // Use the state and functions returned from useTable to build your UI
     const {
          getTableProps,
          getTableBodyProps,
          headerGroups,
          prepareRow,
          page, // Instead of using 'rows', we'll use page,
          // which has only the rows for the active page

          // The rest of these things are super handy, too ;)
          canPreviousPage,
          canNextPage,
          pageOptions,
          pageCount,
          gotoPage,
          nextPage,
          previousPage,
          setPageSize,
          state: { pageIndex, pageSize },
     } = useTable(
          {
               columns,
               data,
               initialState: { pageIndex: 0, pageSize: 10 },
          },
          usePagination
     )

     return (
          <Card border='light'>
               <Card.Header className='d-flex align-items-center'>
                    <h3 className='mr-auto'>Transactions</h3>
               </Card.Header>
               <Card.Body>
                    <Container>

                         <Row>
                              <Col>
                                   <Table striped bordered hover responsive {...getTableProps()}>
                                        <thead>
                                             {headerGroups.map(headerGroup => (
                                                  <tr {...headerGroup.getHeaderGroupProps()}>
                                                       {headerGroup.headers.map(column => (
                                                            <th {...column.getHeaderProps()}>{column.render('Header')}
                                                            </th>
                                                       ))}
                                                  </tr>
                                             ))}
                                        </thead>
                                        <tbody {...getTableBodyProps()}>
                                             {page.map((row, i) => {
                                                  prepareRow(row)
                                                  console.log(row)
                                                  return (
                                                       <tr {...row.getRowProps()}>
                                                            {row.cells.map(cell => {
                                                                 return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                                            })}
                                                       </tr>
                                                  )
                                             })}
                                        </tbody>
                                   </Table>
                              </Col>
                         </Row>

                         <Row>
                              <Col>
                                   <Pagination>
                                        <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
                                        <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
                                        {(pageOptions.length < 10)
                                             ? [...Array(pageOptions.length)].map((e, i) => <Pagination.Item onClick={() => gotoPage(i)} active={(pageIndex === i)}>{i + 1}</Pagination.Item>)
                                             : <span>Page <strong>{pageIndex + 1} of {pageOptions.length}</strong></span>
                                        }
                                        <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
                                        <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
                                   </Pagination>
                              </Col>
                              <Col sm='3'>
                                   <Form.Control as="select"
                                        value={pageSize}
                                        onChange={e => {
                                             setPageSize(Number(e.target.value))
                                        }}
                                   >
                                        {[10, 20, 30, 40, 50].map(pageSize => (
                                             <option key={pageSize} value={pageSize}>
                                                  Show {pageSize}
                                             </option>
                                        ))}
                                   </Form.Control>

                              </Col>
                         </Row>
                    </Container>
               </Card.Body>
          </Card>
     )
}

export default TransactionsTable;