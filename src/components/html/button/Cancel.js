import React from 'react';
import { MDBBtn } from 'mdbreact';

const Cancel = ({ onClick, title }) => {
  return (
    <React.Fragment>
      <MDBBtn onClick={onClick} size='lg' className='py-2 d-block mr-0 shadow-none btnOption btnCancel'>
        <i className='fas fa-chevron-left'></i>
        <span className='ml-2'>{title}</span>
      </MDBBtn>
    </React.Fragment>
  );
};

export default Cancel;
