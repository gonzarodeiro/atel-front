import React, { useState, useEffect } from 'react';
import { MDBBtn } from 'mdbreact';

const Body = ({ title, colorStyle, colorClass, iconItem }) => {
  const [icon, setIcon] = useState();
  useEffect(() => {
    setIcon(iconItem);
  }, []);

  function handleSubmit() {
    //call bd
  }

  return (
    <React.Fragment>
      <div data-test='col' className='col-md-12 col-lg-4 mb-lg-0 mb-4' onClick={() => handleSubmit()} style={{ cursor: 'pointer' }}>
        <div data-test='card' className='card' style={{ borderRadius: '20px' }} id='hvr-float'>
          <div data-test='card-body' className='card-body'>
            <div className='d-flex justify-content-center'>
              <div className='justify-content-center align-items-center'>
                <i data-test='fa' className={icon} style={{ color: colorStyle, fontSize: '125px' }}></i>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MDBBtn size='lg' className={'darken-2 shadow-none text-white btnOption mt-3 ' + colorClass}>
                <span>{title}</span>
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Body;
