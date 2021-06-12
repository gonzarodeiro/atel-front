import React from 'react';
import { MDBNotification } from 'mdbreact';

const Notification = ({ title, message }) => {
  return (
    <React.Fragment>
      <MDBNotification show fade iconClassName='text-primary' closeClassName='blue-grey-text' icon='envelope' title={title} message={message} autohide={5000} style={{ position: 'fixed', top: '102px', right: '10px', zIndex: 9999 }} />
    </React.Fragment>
  );
};

export default Notification;
