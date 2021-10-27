import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Item = ({ title, colorStyle, firstItem, secondItem, redirectFirstItem, redirectSecondItem }) => {
  const [borderBottom, setBorder] = useState();
  let history = useHistory();

  useEffect(() => {
    setBorder('2px solid ' + colorStyle);
  }, []);

  function redirect(path) {
    history.push({ pathname: path });
  }

  return (
    <React.Fragment>
      <div data-test='col' className='col-md-12 col-lg-4 mb-lg-0 mb-4'>
        <div data-test='card' className='card ' style={{ borderRadius: '20px' }}>
          <div data-test='card-body' className='card-body animated zoomIn faster'>
            <h5 className='text-center' style={{ color: [colorStyle], fontSize: '20px', fontWeight: '600', borderBottom: borderBottom, padding: '0px 0px 4px 0px', marginBottom: '14px' }}>
              {title}
            </h5>
            <label onClick={() => redirect(redirectFirstItem)} className='dark-grey-text' style={{ cursor: 'pointer', marginTop: '16px', marginBottom: '16px' }}>
              - {firstItem}
            </label>
            <label onClick={() => redirect(redirectSecondItem)} className='dark-grey-text' style={{ cursor: 'pointer', marginBottom: '54px' }}>
              - {secondItem}
            </label>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Item;
