import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Jitsi from '../../components/Jitsi';
import Layout from '../../utils/layout/index';
import { useHistory } from 'react-router-dom';
import Cancel from '../../components/html/button/Cancel';
import { MDBBtn } from 'mdbreact';

const ProfessionalSession = () => {
  let { roomId } = useParams();
  let sharedLink = window.location.href.replace('professionalSession', 'studentSession');
  let history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem('name')) history.push(`/login`);
  }, []);

  function copyClipboard() {
    navigator.clipboard.writeText(sharedLink);
  }

  return (
    <Layout>
      <div className='card shadow-sm container px-0 overflow-hidden' style={{ border: '1px solid #cecbcb' }}>
        <div className='container'>
          <div className='card-body pb-3'>
            <div className='card-title pb-3 border-bottom h5 text-muted' style={{ fontSize: '16px', fontWeight: 'bold' }}>
              Sesión con {roomId}
            </div>
            <form action='' id='form-inputs' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
              <div className='row'>
                <div className='pb-3 mt-2 col-md-9'>
                  <Jitsi roomId={roomId} userName={sessionStorage.getItem('name')}></Jitsi>
                  <div className='row col-md-12 mt-2'>
                    <MDBBtn onClick={copyClipboard} size='lg' className='py-2 d-block mr-0 shadow-none btnOption btnCancel'>
                      <span className='mr-2'>Compartir link</span>
                      <i className='fas fa-chevron-right'></i>
                    </MDBBtn>
                    <Cancel onClick={copyClipboard} title='Herramienta numérica' />
                    <Cancel onClick={copyClipboard} title='Herramienta alfabetización' />
                  </div>
                </div>
                {/* <div className='pb-3 mt-4 col-md-3'>
                  <Cancel onClick={copyClipboard} title='Herramienta numérica' />
                  <Cancel onClick={copyClipboard} title='Herramienta alfabetización' />
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessionalSession;
