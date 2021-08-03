import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../../utils/layout/index';
import postResponseApi from '../../../utils/services/post/postResponseApi';
import GeneralInformation from './steps/generalInformation';
import SharedLink from './steps/sharedLink';

const Index = () => {
  const [session, setSession] = useState({ studentName: '', name: '', password: '' });
  const [student, setStudent] = useState({ id: '', name: '' });
  const [link, setLink] = useState();
  const [steps, setSteps] = useState({ generalInformation: true, sharedLink: false });
  const [showValidation, setShowValidation] = useState(false);
  const [modal, showModal] = useState({ notification: false });
  const [errors, setErrors] = useState({ show: false, message: '' });
  let history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem('name')) history.push(`/login`);
  }, []);

  const handleChangeStudent = (event) => {
    const { id, value } = event.target;
    const fields = value.split('-');
    setSession({ ...session, [id]: value });
    setStudent({ id: fields[0], name: fields[1] });
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setSession({ ...session, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateFields()) {
      const filters = createFilters();
      await postResponseApi('https://atel-back-stg.herokuapp.com/student/shared', filters);
      setSteps({ generalInformation: false, sharedLink: true });
      setErrors({ show: false, message: '' });
      const id_professional = 1; // levantar de sessionStorage
      const sharedLink = window.location.href.replace('share-session', 'material-to-be-adapted/' + session.name + '-' + id_professional + '-' + parseInt(student.id));
      setLink(sharedLink);
    }
  };

  function validateFields() {
    if (!session.studentName || !session.name || !session.password) {
      setErrors({ show: true, message: 'Complete los campos obligatorios' });
      setShowValidation(true);
      return;
    }
    return true;
  }

  function handleCopy() {
    navigator.clipboard.writeText(link);
    showModal({ notification: true });
  }

  function createFilters() {
    return {
      idStudent: parseInt(student.id),
      idProfessional: 1, // levantar de sessionStorage
      name: session.name,
      password: session.password
    };
  }

  return (
    <Layout>
      <div className='card shadow-sm container px-0' style={{ border: '1px solid #cecbcb' }}>
        <div className='container'>
          <div className='card-body pb-3'>
            <div className='card-title pb-3 border-bottom h5 text-muted' style={{ fontSize: '16px', fontWeight: 'bold' }}>
              Compartir sesiones con profesionales
            </div>
            <form action='' id='form-inputs' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
              {steps.generalInformation && <GeneralInformation handleChangeStudent={handleChangeStudent} session={session} handleSubmit={handleSubmit} showValidation={showValidation} handleChange={handleChange} errors={errors} />}
              {steps.sharedLink && <SharedLink setSteps={setSteps} handleCopy={handleCopy} link={link} modal={modal} setSession={setSession} />}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Index;
