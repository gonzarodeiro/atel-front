import React from 'react';
import Body from './Body';

const End = () => {
  return (
    <React.Fragment>
      <div className='d-flex justify-content-center align-items-center' style={{ marginBottom: '25px', marginTop: '25px', marginLeft: '20px', marginRight: '20px' }}>
        <Body title='Excelente' colorStyle='#33a74d ' colorClass='green' iconItem='far fa-smile-beam' />
        <Body title='Regular' colorStyle='#ffc107db' colorClass='yellow' iconItem='far fa-tired' />
        <Body title='Mal' colorStyle='rgb(211 47 47 / 95%)' colorClass='red' iconItem='far fa-angry' />
      </div>
    </React.Fragment>
  );
};

export default End;
