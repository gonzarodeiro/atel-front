import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../utils/layout/index';
import { BASE_URL } from '../../config/environment';
import { Form } from 'react-bootstrap';
import getByFilters from '../../utils/services/get/getByFilters/index';
import PictogramTemplateEditor from '../../components/Activity/Pictograms/PictogramTemplateEditor';

const Index = () => {
  const [params, setParams] = useState({ id: '', studentName: '' });
  const [student, setStudent] = useState({ id: '', name: '' });
  const [apis, setApis] = useState({ dlStudents: [] });
  let history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem('name')) history.push(`/login`);
    else loadStudents();
  }, []);

  async function loadStudents() {
    const filters = { idProfessional: parseInt(sessionStorage.getItem('idProfessional')) };
    let students = await getByFilters(`${BASE_URL}/student/search`, filters);
    console.log(students);
    students.unshift({ id: 0, fullName: 'Seleccione' });
    setApis({ dlStudents: students });
  }

  const handleChange = (event) => {
    const { id, value } = event.target;
    setParams({ ...params, [id]: value });
    const student = decodeOptionValue(value);
    setStudent(student);
  };

  function encodeOptionValue(idStudent, fullName) {
    return JSON.stringify({ id: idStudent, name: fullName });
  }

  function decodeOptionValue(value) {
    return JSON.parse(value);
  }

  return (
    <Layout>
      <div className='card shadow-sm container px-0' style={{ border: '1px solid #cecbcb' }}>
        <div className='container'>
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
                      {apis.dlStudents.map((s) => (
                        <option key={s.id} value={encodeOptionValue(s.id, s.fullName)}>
                          {s.fullName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>
              </div>
            </form>
            {student.id > 0 && <PictogramTemplateEditor idProfessional={sessionStorage.getItem('idProfessional')} idStudent={student.id} studentName={student.name} onCancel={() => history.push(`/home`)} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Index;
