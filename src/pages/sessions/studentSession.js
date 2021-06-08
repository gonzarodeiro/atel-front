import React from 'react';
import { useParams } from 'react-router-dom';
import Jitsi from '../../components/Jitsi';
import Layout from '../../utils/layout';

const StudentSession = () => {
  let { roomId } = useParams();
  let userName = roomId;
  let containerStyle = { width: '100vw', height: '90vh' };

  return (
    <Layout>
      <Jitsi roomId={roomId} userName={userName} containerStyle={containerStyle}></Jitsi>
    </Layout>
  );
};

export default StudentSession;
