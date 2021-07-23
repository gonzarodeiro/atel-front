import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../../utils/layout/index';
import Table from '../../../components/html/Table';
import Loading from '../../../components/Loading';
import Footer from '../../../components/html/Footer';
import Dropdownlist from '../../../components/html/Dropdownlist';
import { dlStudents, dlDifficulty } from '../../../utils/dropdownlists/index';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import datepicker from '../../../utils/commons/datepicker';
import showAlert from '../../../utils/commons/showAlert';
import convertDate from '../../../utils/commons/convertDate';
import convertDateTime from '../../../utils/commons/convertDateTime';
import cleanObject from '../../../utils/commons/cleanObject';
import swal from '@sweetalert/with-react';
import SessionPendingDetail from './modal/SessionPendingDetail';
import getParametry from '../../../utils/services/get/getByFilters/index';
import status from '../../..//utils/enums/sessionStatus';
registerLocale('es', datepicker);

const Index = () => {
  const [params, setParams] = useState({ dateFrom: new Date(), dateTo: new Date(), studentName: '', diagnostic: '', message: '' });
  const [table, setTable] = useState({ columns: [], rows: [], actions: [], show: false });
  const [error, setErrors] = useState({ show: false, message: '' });
  const [showModal, setShowModal] = useState({ details: false });
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
    getSchedule();
  };

  async function getSchedule() {
    const values = getParameters();
    cleanObject(values);
    const result = await getParametry('https://atel-back-stg.herokuapp.com/session', values);
    createActions(result);
    fillTable(result);
  }

  function getParameters() {
    return {
      id_professional: 1, // agarrar id de sessionStorage cuando se registren
      status: status.Pending,
      studentName: params.studentName,
      diagnostic: params.diagnostic,
      dateTo: convertDate(params.dateTo),
      dateFrom: convertDate(params.dateFrom)
    };
  }

  function createActions(result) {
    for (let i = 0; i < result.length; i++) {
      result[i].start_datetime = convertDateTime(new Date(result[i].start_datetime));
      result[i].actions = (
        <div>
          <i onClick={() => handleEdit(result[i])} className='fas fa-pencil-alt mt-1 mr-2' title='Editar sesión' style={{ cursor: 'pointer' }} aria-hidden='true'></i>
          <i onClick={() => handleDelete(result[i])} className='fas fa-trash mt-1' title='Eliminar sesión' style={{ cursor: 'pointer' }} aria-hidden='true'></i>
        </div>
      );
    }
  }

  function handleEdit() {
    setShowModal({ details: true });
  }

  function handleCloseDetails() {
    setShowModal({ details: false });
  }

  function handleDelete(obj) {
    swal(
      <div>
        <p className='h4 mt-4 mb-4'>¿Querés dar de baja la sesión?</p>
        <span>Alumno: {obj.full_name}</span>
        <p>Fecha: {obj.start_datetime}</p>
        <input id='message' placeholder='Comentario' onChange={handleChange} value={params.comments} type='text' className='form-control mt-4' />
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
      if (value === 'delete') patchSchedule(obj);
    });
  }

  async function patchSchedule(obj) {
    setLoading(true);
    // const data = { status: obj.id, comments: params.comments };
    // await patchApi("endpoint", data);
    setLoading(false);
    await showAlert('Sesión eliminada', `La sesión: ${obj.date} ha sido dada de baja`, 'success');
    history.push(`/home`);
  }

  function fillTable(result) {
    if (result.length > 0) {
      setTable({
        columns: [
          { label: '', field: 'actions' },
          { label: 'Nombre', field: 'full_name' },
          { label: 'Dificultad', field: 'diagnostic' },
          { label: 'Fecha sesión', field: 'start_datetime' }
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
              Listado de sesiones pendientes
            </div>
            <form action='' id='form-inputs' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
              <div className='row pb-1'>
                <div className='col-md-3 my-2'>
                  <label>Fecha Desde</label>
                  <DatePicker id='dateFrom' minDate={new Date()} showYearDropdown scrollableMonthYearDropdown dateFormat='dd/MM/yyyy' placeholderText='Seleccione una fecha' selected={params.dateFrom} todayButton='Hoy' onChange={(date) => setParams({ ...params, dateFrom: date })} value={params.dateFrom} className='form-control' locale='es' />
                </div>
                <div className='col-md-3 my-2'>
                  <label>Fecha Hasta</label>
                  <DatePicker id='dateTo' minDate={new Date()} showYearDropdown scrollableMonthYearDropdown dateFormat='dd/MM/yyyy' placeholderText='Seleccione una fecha' selected={params.dateTo} todayButton='Hoy' onChange={(date) => setParams({ ...params, dateTo: date })} value={params.dateTo} className='form-control' locale='es' />
                </div>
                <div className='col-md-3 my-2'>
                  <Dropdownlist title='Nombre del alumno' id='studentName' handleChange={handleChange} value={params.studentName} dropdownlist={dlStudents} disabledValue={false} className='form-control' />
                </div>
                <div className='col-md-3 my-2'>
                  <Dropdownlist title='Dificultad' id='diagnostic' handleChange={handleChange} value={params.diagnostic} dropdownlist={dlDifficulty} disabledValue={false} className='form-control' />
                </div>
              </div>
              <Footer error={error} onClickPrev={() => history.push(`/home`)} onClickSearch={handleSubmit} />
              {showModal.details && <SessionPendingDetail showModal={showModal} handleClose={handleCloseDetails} />}
              {table.show && <Table data={table} />}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Index;
