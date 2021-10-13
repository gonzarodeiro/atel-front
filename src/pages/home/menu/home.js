import React, { useState, useEffect } from 'react';

const Home = ({ title, module, colorStyle, returnModule, description, iconItem }) => {
  const [icon, setIcon] = useState();
  const [borderCard, setBorderCard] = useState();

  useEffect(() => {
    setIcon(iconItem);
    setBorderCard('2px solid ' + colorStyle);
  }, []);

  return (
    <React.Fragment>
      <div data-test='col' className='col-md-12 col-lg-4 mb-lg-0 mb-4' onClick={() => returnModule(module)} style={{ cursor: 'pointer' }}>
        <div data-test='card' className='card mr-1' style={{ borderRadius: '25px' }} id='hvr-float'>
          <div data-test='card-body' className='card-body'>
            <h5 className='text-center' style={{ color: [colorStyle], fontSize: '18.5px', fontWeight: '600', marginBottom: '18px' }}>
              {title}
            </h5>
            <div className='d-flex justify-content-center'>
              <div className='card-circle d-flex justify-content-center align-items-center' style={{ border: borderCard }}>
                <i data-test='fa' className={icon} style={{ color: colorStyle, fontSize: '20px' }}></i>
              </div>
            </div>
            <p className='mt-3 text-center dark-grey-text mb-2'>{description}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
