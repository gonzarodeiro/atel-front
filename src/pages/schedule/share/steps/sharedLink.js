import React from 'react';
import Cancel from '../../../../components/html/button/Cancel';
import Submit from '../../../../components/html/button/Submit';
import Notification from '../../../../components/html/Notification';

const SharedLink = ({ setSteps, handleCopy, link, modal, setSession }) => {
  function handleCancel() {
    setSession({ userName: '', password: '' });
    setSteps({ generalInformation: true, sharedLink: false });
  }

  return (
    <React.Fragment>
      <form action='' id='form-inputs' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
        <div className='mt-3' data-test='col'>
          <label className='mb-2'>Link a compartir</label>
        </div>
        <div data-test='container' className='container-fluid section mb-3 border p-2'>
          <div className='text-center' style={{ marginTop: '2px' }}>
            {link}
          </div>
        </div>
        {modal.notification && <Notification title='Link copiado' message='Debe compartirlo con el profesional' />}
        <div className='row align-items-center d-flex flex-column-reverse flex-md-row pb-2'>
          <div className='col-md-12 d-flex justify-content-center justify-content-md-end my-2'>
            <Cancel onClick={handleCancel} title='Volver' />
            <Submit onClick={handleCopy} title='Copiar' />
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default SharedLink;
