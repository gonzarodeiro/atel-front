import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Jitsi from '../../components/Jitsi';
import Layout from '../../utils/layout/index';

const ProfessionalSession = () => {
  let { roomId } = useParams();
  let sharedLink = window.location.href.replace('professionalSession', 'studentSession');

  //Pruebas
  // const jitsiRef = useRef();
  // const resizeJitsi = () => {
  //   jitsiRef.current.resizeJitsi(600, 600);
  // };
  // //

  function copyClipboard() {
    navigator.clipboard.writeText(sharedLink);
  }

  return (
    <Layout>
      <Jitsi roomId={roomId} userName={sessionStorage.getItem('name')}></Jitsi>
      <input style={{ width: '500px' }} diseabled='true' id='sharedLink' type='text' value={sharedLink} />
      <button type='button' className='fas fa-share' style={{ marginLeft: '7px', width: '40px', height: '28px', cursor: 'pointer', borderRadius: '10px' }} onClick={copyClipboard}></button>
    </Layout>
  );
};

export default ProfessionalSession;
