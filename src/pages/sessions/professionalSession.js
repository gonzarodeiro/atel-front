import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import Jitsi from '../../components/Jitsi';

const ProfessionalSession = (props) => {
  let { roomId } = useParams();
  let user = sessionStorage.getItem('name');

  //Pruebas
  // const jitsiRef = useRef();
  // const resizeJitsi = () => {
  //   jitsiRef.current.resizeJitsi(600, 600);
  // };
  // //

  let sharedLink = window.location.href.replace('professionalSession', 'studentSession');

  return (
    <>
      <Jitsi roomId={roomId} userName={user}></Jitsi>
      <input style={{ width: '350px' }} diseabled='true' id='sharedLink' type='text' value={sharedLink} />
      <button
        type='button'
        className='fas fa-share'
        style={{ width: '50px', height: '28px', cursor: 'pointer', borderRadius: '10px' }}
        onClick={() => {
          navigator.clipboard.writeText(sharedLink);
        }}
      ></button>
    </>
  );
};

export default ProfessionalSession;
