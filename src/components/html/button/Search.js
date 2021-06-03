import React from 'react';
import { MDBBtn } from 'mdbreact';

const Search = ({ onClick }) => {
  return (
    <React.Fragment>
      <MDBBtn className='py-2 blue darken-2 d-block mr-0 shadow-none text-white btnOption' onClick={onClick}>
        <span className='mr-2'>Buscar</span>
        <i className='fas fa-search'></i>
      </MDBBtn>
    </React.Fragment>
  );
};

export default Search;
