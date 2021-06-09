import React, { useEffect, useState } from 'react';
import Jitsi from '../../components/Jitsi';
import Layout from '../../utils/layout/index';
import { useHistory } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';

const ProfessionalSession = (props) => {
  const [session, setSession] = useState({ comments: '' });
  let history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem('name')) history.push(`/login`);
    else {
      if (!props.location.state) history.push(`/home`);
    }
  }, []);

  function copyClipboard() {
    const sharedLink = window.location.href.replace('professionalSession', 'studentSession/' + props.location.state.userName);
    navigator.clipboard.writeText(sharedLink);
  }

  const handleChange = (event) => {
    const { id, value } = event.target;
    setSession({ ...session, [id]: value });
  };

  return (
    <Layout>
      <div className='card shadow-sm container px-0 overflow-hidden' style={{ border: '1px solid #cecbcb' }}>
        <div className='container'>
          <div className='card-body'>
            <div className='card-title pb-1 border-bottom h5 text-muted' style={{ fontSize: '16px', fontWeight: 'bold' }}>
              {props.location.state && (
                <label>
                  Sesión con {props.location.state.userName} - {props.location.state.date}
                </label>
              )}
            </div>
            <form action='' id='form-inputs' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
              <div className='row'>
                <div className='pb-3 mt-2 col-md-8'>{props.location.state && <Jitsi roomId={props.location.state.roomId} userName={sessionStorage.getItem('name')} />}</div>
                <div className='col-md-4' style={{ marginTop: '3px' }}>
                  <div data-test='col'>
                    <label className='mb-2' style={{ fontSize: '13px', fontWeight: 'bold' }}>
                      Compartir link con el alumno
                    </label>
                  </div>
                  <div data-test='container' className='container-fluid section mb-5 border p-3 col-md-12'>
                    <div className='row'>
                      <MDBBtn onClick={copyClipboard} size='lg' className='py-2 blue darken-2 shadow-none text-white btnOption w-100' style={{ marginLeft: '15px', marginRight: '15px' }}>
                        <span className='mr-2'>Link de la reunion</span>
                        <i className='fas fa-chevron-right'></i>
                      </MDBBtn>
                    </div>
                  </div>
                  <div data-test='col'>
                    <label className='mb-2' style={{ fontSize: '13px', fontWeight: 'bold' }}>
                      Herramientas didácticas
                    </label>
                  </div>
                  <div data-test='container' className='container-fluid section mb-3 border p-3 col-md-12'>
                    <div className='row'>
                      <div className='col-md-12 mt-2'>
                        <MDBBtn onClick={copyClipboard} size='lg' className='py-2 red darken-1 shadow-none text-white btnOption w-100 ml-0'>
                          <span>Númerica y lógica</span>
                        </MDBBtn>
                      </div>
                      <div className='col-md-12 mt-2'>
                        <MDBBtn onClick={copyClipboard} size='lg' className='py-2 red darken-1 shadow-none text-white btnOption w-100 ml-0'>
                          <span>Alfabetización</span>
                        </MDBBtn>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-12 mt-2'>
                        <MDBBtn onClick={copyClipboard} size='lg' className='py-2 red darken-1 shadow-none text-white btnOption w-100 ml-0'>
                          <span>Pictogramas</span>
                        </MDBBtn>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-2'>
                <div className='col-md-12 my-1'>
                  <label>Observaciones generales</label>
                  <textarea id='comments' rows='3' onChange={handleChange} value={session.comments} type='text' className='form-control' />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessionalSession;
