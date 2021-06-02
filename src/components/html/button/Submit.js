import React from 'react';
import { MDBBtn } from 'mdbreact';

const Submit = ({ onClick }) => {
  return (
    <React.Fragment>
      <MDBBtn onClick={onClick} size='lg' className='py-2 blue darken-2 mr-0 shadow-none text-white btnOption'>
        <span className='mr-2'>Guardar</span>
        <i className='fas fa-chevron-right'></i>
      </MDBBtn>
    </React.Fragment>
  );
};

export default Submit;
