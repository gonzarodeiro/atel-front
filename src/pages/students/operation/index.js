import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../../utils/layout/index';
import Table from '../../../components/html/Table';
import Loading from '../../../components/Loading';
import Dropdownlist from '../../../components/html/Dropdownlist';
import { dlDifficulty, dlStudents } from '../../../utils/dropdownlists/index';
import Footer from '../../../components/html/Footer';
import showAlert from '../../../utils/commons/showAlert';
import swal from '@sweetalert/with-react';
import deleteResponseApi from '../../../utils/services/delete/deleteResponseApi';
import { BASE_URL } from '../../../config/environment';
import StudentDetails from './modal/StudentDetails';

const Index = () => {
  const [params, setParams] = useState({ name: '', age: '', difficulty: '' });
  const [student, setStudent] = useState({ firstName: '', lastName: '', age: '', difficulty: '', comments: '' });
  const [showModal, setShowModal] = useState({ details: false });
  const [table, setTable] = useState({ columns: [], rows: [], actions: [], show: false });
  const [error, setErrors] = useState({ show: false, message: '' });
  const [errorStudents, setErrorsStudents] = useState({ show: false, message: '' });
  const [showValidation, setShowValidation] = useState(false);
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem('name')) history.push(`/login`);
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setParams({ ...params, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    getStudents();
  };

  async function getStudents() {
    const result = [
      {
        name: 'German Perez',
        age: '5',
        difficulty: 'TEA',
        comments: 'Vive con su familia y le cuesta prestar atención a las clases'
      },
      {
        name: 'Lucas Gomez',
        age: '8',
        difficulty: 'Down',
        comments: 'Vive con su familia y le cuesta usar la compu'
      }
    ];
    createActions(result);
    fillTable(result);
  }

  function createActions(result) {
    for (let i = 0; i < result.length; i++) {
      result[i].actions = (
        <div>
          <i onClick={() => handleEdit(result[i])} className='fas fa-pencil-alt mt-1 mr-2' title='Editar alumno' style={{ cursor: 'pointer' }} aria-hidden='true'></i>
          <i onClick={() => handleDelete(result[i])} className='fas fa-trash mt-1' title='Eliminar alumno' style={{ cursor: 'pointer' }} aria-hidden='true'></i>
        </div>
      );
    }
  }

  function handleEdit(obj) {
    setStudent(obj);
    setShowModal({ details: true });
  }

  function handleDelete(obj) {
    swal(
      <div>
        <p className='h4 mt-4 mb-3'>¿Querés dar de baja al alumno: {obj.name}?</p>
      </div>,
      {
        icon: 'warning',
        buttons: {
          cancel: 'No',
          catch: {
            text: 'Si',
            value: 'delete'
          }
        }
      }
    ).then((value) => {
      if (value === 'delete') deleteStudent(obj);
    });
  }

  async function deleteStudent(obj) {
    setLoading(true);
    await deleteResponseApi(`${BASE_URL}/student/${obj.id}`);
    setLoading(false);
    await showAlert('Alumno eliminado', `El alumno ${obj.firstName} ${obj.lastName} ha sido dado de baja`, 'success');
    history.push(`/home`);
  }

  function fillTable(result) {
    if (result.length > 0) {
      setTable({
        columns: [
          { label: '', field: 'actions' },
          { label: 'Nombre', field: 'name' },
          { label: 'Edad', field: 'age' },
          { label: 'Dificultad', field: 'difficulty' },
          { label: 'Información', field: 'comments' }
        ],
        rows: result,
        show: true
      });
      setErrors({ show: false });
    } else {
      setTable({ show: false });
      setErrors({ show: true, message: 'No hay información para mostrar' });
    }
    setLoading(false);
  }

  function handleClose() {
    setShowModal({ details: false });
  }

  const handleChangeStudent = (event) => {
    const { id, value } = event.target;
    setStudent({ ...params, [id]: value });
  };

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
              Consulta de alumnos
            </div>
            <form action='' id='form-inputs' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
              <div className='row'>
                <div className='col-md-4 my-2'>
                  <Dropdownlist title='Nombre y apellido' id='name' handleChange={handleChange} value={params.name} dropdownlist={dlStudents} disabledValue={false} className='form-control' />
                </div>
                <div className='col-md-4 my-2'>
                  <label>Edad</label>
                  <input id='age' onChange={handleChange} value={params.age} type='number' className='form-control' />
                </div>
                <div className='col-md-4 my-2'>
                  <Dropdownlist title='Dificultad' id='difficulty' handleChange={handleChange} value={params.difficulty} dropdownlist={dlDifficulty} disabledValue={false} className='form-control' />
                </div>
              </div>
              <Footer error={error} onClickPrev={() => history.push(`/home`)} onClickSearch={handleSubmit} />
              {showModal.details && <StudentDetails showModal={showModal} handleClose={handleClose} student={student} handleChange={handleChangeStudent} showValidation={showValidation} errors={errorStudents} setErrors={setErrorsStudents} setShowValidation={setShowValidation} />}
              {table.show && <Table data={table} />}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Index;
