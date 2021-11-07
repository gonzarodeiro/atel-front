import React, { useState } from 'react';
import { MDBBtn } from 'mdbreact';

const Body = ({ setEvaluation }) => {
  const [borderColorGreen, setBorderColorGreen] = useState();
  const [borderColorYellow, setBorderColorYellow] = useState();
  const [borderColorRed, setBorderColorRed] = useState();

  function setColorGreen() {
    setBorderColorGreen('2px solid green');
    setBorderColorYellow('');
    setBorderColorRed('');
    setEvaluation('Excelente');
  }

  function setColorYellow() {
    setBorderColorGreen('');
    setBorderColorYellow('2px solid orange');
    setBorderColorRed('');
    setEvaluation('Regular');
  }

  function setColorRed() {
    setBorderColorGreen('');
    setBorderColorYellow('');
    setBorderColorRed('2px solid red');
    setEvaluation('Mal');
  }

  return (
    <React.Fragment>
      <div data-test='col' className='col-md-12 col-lg-4 mb-lg-0 mb-4 mr-1' onClick={() => setColorGreen()} style={{ cursor: 'pointer' }}>
        <div data-test='card' className='card' style={{ borderRadius: '20px', border: borderColorGreen }} id='hvr-float'>
          <div data-test='card-body' className='card-body'>
            <div className='d-flex justify-content-center'>
              <div className='justify-content-center align-items-center'>
                <i data-test='fa' className='far fa-smile-beam' style={{ color: '#33a74d', fontSize: '100px' }}></i>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MDBBtn size='lg' className='darken-2 shadow-none text-white btnOption mt-3 green'>
                <span>Excelente</span>
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
      <div data-test='col' className='col-md-12 col-lg-4 mb-lg-0 mb-4 mr-1' onClick={() => setColorYellow()} style={{ cursor: 'pointer' }}>
        <div data-test='card' className='card' style={{ borderRadius: '20px', border: borderColorYellow }} id='hvr-float'>
          <div data-test='card-body' className='card-body'>
            <div className='d-flex justify-content-center'>
              <div className='justify-content-center align-items-center'>
                <i data-test='fa' className='far fa-tired' style={{ color: '#ffc107db', fontSize: '100px' }}></i>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MDBBtn size='lg' className='darken-2 shadow-none text-white btnOption mt-3 yellow'>
                <span>Regular</span>
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
      <div data-test='col' className='col-md-12 col-lg-4 mb-lg-0 mb-4 mr-1' onClick={() => setColorRed()} style={{ cursor: 'pointer' }}>
        <div data-test='card' className='card' style={{ borderRadius: '20px', border: borderColorRed }} id='hvr-float'>
          <div data-test='card-body' className='card-body'>
            <div className='d-flex justify-content-center'>
              <div className='justify-content-center align-items-center'>
                <i data-test='fa' className='far fa-angry' style={{ color: 'rgb(211 47 47 / 95%)', fontSize: '100px' }}></i>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MDBBtn size='lg' className='darken-2 shadow-none text-white btnOption mt-3 red'>
                <span>Mal</span>
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Body;
