import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function ForgotPassword({ show, close }) {
     return (
          <Modal show={show}
               onHide={() => close()}
               centered
          >
               <Modal.Header closeButton>
                    <Modal.Title>Forgotten your password?</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                    <Form>
                         <p>Please enter your email address to reset your password</p>

                         <Form.Control size='lg' placeholder='Email address' />

                         <Button className='mt-3' onClick={() => close()}>
                              Reset Password
                         </Button>
                    </Form>
               </Modal.Body>

          </Modal>
     )

}

export default ForgotPassword;