import React from 'react';
import { NavDropdown } from 'react-bootstrap';

const Profile = ({ name, email, mobile, openEmailModal, openMobileModal, openPasswordModal }) => {
     const profileIcon = (<><i className='fas fa-user-alt'></i> Profile</>);

     return (
          <NavDropdown title={profileIcon} id='collasible-nav-dropdown'>
               <NavDropdown.Item><h4>{name}</h4></NavDropdown.Item>
               <NavDropdown.Divider />
               <NavDropdown.Item onClick={() => openEmailModal()}>
                    <div><i className="far fa-envelope"></i> Email:</div>
                    <div>{email}</div>
               </NavDropdown.Item>
               <NavDropdown.Divider />
               <NavDropdown.Item onClick={() => openMobileModal()}>
                    <div><i className='fas fa-mobile-alt'></i> Mobile no:</div>
                    <div>{mobile}</div>
               </NavDropdown.Item>
               <NavDropdown.Divider />
               <NavDropdown.Item onClick={() => openPasswordModal()}>Change Password</NavDropdown.Item>
          </NavDropdown>
     );
}

export default Profile;