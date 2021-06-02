import React, { useState, useEffect } from 'react';
import { MDBBtn } from 'mdbreact';

const Home = ({ title, module, colorStyle, colorClass, returnModule, description, iconItem }) => {
  const [icon, setIcon] = useState();
  const [borderCard, setBorderCard] = useState();
  useEffect(() => {
    setIcon(iconItem);
    setBorderCard('2px solid ' + colorStyle);
  }, []);

  return (
    <React.Fragment>
      <div data-test='col' className='col-md-12 col-lg-4 mb-lg-0 mb-4' onClick={() => returnModule(module)} style={{ cursor: 'pointer' }}>
        <div data-test='card' className='card' style={{ borderRadius: '20px' }} id='hvr-float'>
          <div data-test='card-body' className='card-body'>
            <h5 className='mb-4 text-center' style={{ color: [colorStyle], fontSize: '19px' }}>
              {title}
            </h5>
            <div class='d-flex justify-content-center'>
              <div class='card-circle d-flex justify-content-center align-items-center' style={{ border: borderCard }}>
                <i data-test='fa' class={icon} style={{ color: colorStyle, fontSize: '17px' }}></i>
              </div>
            </div>
            <p className='mt-3 text-center dark-grey-text'>{description}</p>
            <div style={{ textAlign: 'center' }}>
              <MDBBtn size='lg' className={'darken-2 shadow-none text-white btnOption ' + colorClass}>
                <span>Ingresar</span>
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
