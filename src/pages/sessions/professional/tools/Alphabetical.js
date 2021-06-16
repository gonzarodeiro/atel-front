import React from 'react';
import { MDBBtn } from 'mdbreact';
import Jitsi from '../../../../components/Jitsi';
import swal from '@sweetalert/with-react';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';

const Alphabetical = ({ props, handleChange, session, showTools, showMeeting }) => {
  function redirectTool(tool) {
    showTools({ [tool]: true });
  }

  function finishSession() {
    swal(
      <div>
        <p className='h4 mt-4 mb-3'>¿Querés finalizar la sesión?</p>
      </div>,
      {
        icon: 'warning',
        buttons: {
          cancel: 'No',
          catch: {
            text: 'Si',
            value: 'ok'
          }
        }
      }
    ).then((value) => {
      if (value === 'ok') redirectEnd();
    });
  }

  function redirectEnd() {
    showTools({ alphabetical: false });
    showMeeting({ end: true });
  }

  return (
    <React.Fragment>
      <div className='row'>
        <div className='pb-3 mt-2 col-md-8'>
          <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
              <Text text='Some text on canvas' fontSize={15} />
              <Rect x={20} y={50} width={100} height={100} fill='red' shadowBlur={10} />
              <Circle x={200} y={100} radius={50} fill='green' />
              <Line x={20} y={200} points={[0, 0, 100, 0, 100, 100]} tension={0.5} closed stroke='black' fillLinearGradientStartPoint={{ x: -50, y: -50 }} fillLinearGradientEndPoint={{ x: 50, y: 50 }} fillLinearGradientColorStops={[0, 'red', 1, 'yellow']} />
            </Layer>
          </Stage>
          {/* {props.location.state && <Jitsi roomId={props.location.state.roomId + '-' + props.location.state.sessionId} userName={sessionStorage.getItem('name')} />} */}
        </div>
        <div className='col-md-4' style={{ marginTop: '3px' }}>
          <div data-test='col'>
            <label className='mb-2' style={{ fontSize: '13px', fontWeight: 'bold' }}>
              Herramientas didácticas
            </label>
          </div>
          <div data-test='container' className='container-fluid section mb-3 border p-3 col-md-12'>
            <div className='row'>
              <div className='col-md-12 mt-2'>
                <MDBBtn onClick={() => redirectTool('numerical')} size='lg' className='py-2 blue darken-2 shadow-none text-white btnOption w-100 ml-0'>
                  <span>Númerica y lógica</span>
                </MDBBtn>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12 mt-2'>
                <MDBBtn onClick={() => redirectTool('pictogram')} size='lg' className='py-2 blue darken-2 shadow-none text-white btnOption w-100 ml-0'>
                  <span>Pictogramas</span>
                </MDBBtn>
              </div>
            </div>
          </div>
          <div data-test='col'>
            <label className='mb-2' style={{ fontSize: '13px', fontWeight: 'bold' }}>
              Fin de la sesión
            </label>
          </div>
          <div data-test='container' className='container-fluid section mb-3 border p-3 col-md-12'>
            <div className='row'>
              <div className='col-md-12 mt-2'>
                <MDBBtn onClick={finishSession} size='lg' className='py-2 d-block mr-0 shadow-none btnOption btnCancel w-100'>
                  <span>Finalizar</span>
                </MDBBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row mb-2'>
        <div className='col-md-12 my-1'>
          <label>Observaciones de la actividad</label>
          <textarea id='alphabeticalComments' rows='3' onChange={handleChange} value={session.alphabeticalComments} type='text' className='form-control' />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Alphabetical;
