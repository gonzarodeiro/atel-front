import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../utils/layout/index';
import Loading from '../../components/Loading';
import Footer from '../../components/html/Footer';
import { BASE_URL } from '../../config/environment';
import { Form } from 'react-bootstrap';
import getByFilters from '../../utils/services/get/getByFilters/index';

const Index = () => {
  const [params, setParams] = useState({ dateFrom: new Date(), dateTo: new Date(), studentName: '', type: '' });
  const [error, setErrors] = useState({ show: false, message: '' });
  const [loading, setLoading] = useState(false);
  const [apis, setApis] = useState({ dlStudents: [] });
  let history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem('name')) history.push(`/login`);
    else loadStudents();
  }, []);

  async function loadStudents() {
    const filters = { idProfessional: parseInt(sessionStorage.getItem('idProfessional')) };
    let students = await getByFilters(`${BASE_URL}/student/search`, filters);
    students.unshift({ id: 0, fullName: 'Seleccione' });
    setApis({ dlStudents: students });
  }

  const handleChange = (event) => {
    const { id, value } = event.target;
    setParams({ ...params, [id]: value });
  };

  function handleSubmit() {
    setLoading(true);
    // get pictogramas
    setLoading(false);
  }

  return (
    <Layout>
      <div className='card shadow-sm container px-0' style={{ border: '1px solid #cecbcb' }}>
        <div className='container'>
          {loading && (
            <div className={'w-100 h-100 position-absolute d-flex bg-white align-items-center justify-content-center animated'} style={{ left: 0, top: 0, zIndex: 3 }}>
              <Loading />
            </div>
          )}
          <div className='card-body pb-3'>
            <div className='card-title pb-3 border-bottom h5 text-muted' style={{ fontSize: '16px', fontWeight: 'bold' }}>
              Seleccionar plantilla de pictogramas
            </div>
            <form action='' id='form-inputs' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
              <div className='row pb-1'>
                <div className='col-md-12 my-2'>
                  <Form.Group>
                    <Form.Label> Nombre del alumno </Form.Label>
                    <Form.Control id='studentName' onChange={handleChange} className='form-control' value={params.studentName} style={{ cursor: 'pointer' }} as='select' disabled={false}>
                      {apis.dlStudents.map((file) => (
                        <option key={file.id} value={file.fullName}>
                          {file.fullName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>
              </div>
              <Footer error={error} onClickPrev={() => history.push(`/home`)} onClickSearch={handleSubmit} />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Index;
