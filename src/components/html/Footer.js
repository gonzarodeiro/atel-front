import React from 'react';
import Cancel from './button/Cancel';
import Search from './button/Search';

const Footer = ({ error, onClickPrev, onClickSearch }) => {
  return (
    <React.Fragment>
      <div className='row align-items-center d-flex flex-column-reverse flex-md-row pb-3'>
        <div className='col-md-8 my-2'>{error.show === true && <div className='text-danger p-2 rounded w-100 animated bounceInLeft faster errorMessage'>* {error.message}</div>}</div>
        <div className='col-md-4 my-2 d-flex justify-content-center justify-content-md-end my-2'>
          <Cancel onClick={onClickPrev} title='Volver' />
          <Search onClick={onClickSearch} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
