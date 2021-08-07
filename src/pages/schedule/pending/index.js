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
import convertDate from '../../../utils/commons/convertDate';
import convertDateTime from '../../../utils/commons/convertDateTime';
import cleanObject from '../../../utils/commons/cleanObject';
import swal from '@sweetalert/with-react';
import SessionPendingDetail from './modal/SessionPendingDetail';
import getParametry from '../../../utils/services/get/getByFilters/index';
import patchApi from '../../../utils/services/patch/patchApi';
import status from '../../../utils/enums/sessionStatus';
import showAlert from '../../../utils/commons/showAlert';
import MaterialToAdapt from './modal/MaterialToAdapt';
import { BASE_URL } from '../../../config/environment';
import AdaptedInformation from './modal/AdaptedInformation';

registerLocale('es', datepicker);

const Index = () => {
  const [params, setParams] = useState({ dateFrom: new Date(), dateTo: new Date(), studentName: '', diagnostic: '' });
  const [table, setTable] = useState({ columns: [], rows: [], actions: [], show: false });
  const [tableMaterial, setTableMaterial] = useState({ columns: [], rows: [], actions: [], show: false });
  const [error, setErrors] = useState({ show: false, message: '' });
  const [errorMaterial, setErrorsMaterial] = useState({ show: false, message: '' });
  const [showModal, setShowModal] = useState({ details: false, materialToAdapt: false, adaptInformation: false });
  const [idSession, setIdSession] = useState();
  const [userName, setUserName] = useState();
  const [sessionDate, setSessionDate] = useState();
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem('name')) history.push(`/login`);
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setParams({ ...params, [id]: value });
  };

  function handleSubmit() {
    setLoading(true);
    getSchedule();
  }

  async function getSchedule() {
    const values = getParameters();
    cleanObject(values);
    const result = await getParametry(`${BASE_URL}/session`, values);
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
    if (!result) return;
    for (let i = 0; i < result.length; i++) {
      result[i].date = convertDateTime(new Date(result[i].start_datetime));
      result[i].actions = (
        <div>
          <i onClick={() => handleEdit(result[i])} className='fas fa-pencil-alt mt-1 mr-2' title='Editar sesión' style={{ cursor: 'pointer', color: 'rgb(25 106 185)' }} aria-hidden='true'></i>
          <i onClick={() => handleMaterialToAdapt(result[i])} className='fas fa-download mt-1 mr-2' title='Material a adaptar' style={{ cursor: 'pointer', color: '#388e3c' }} aria-hidden='true'></i>
          <i onClick={() => handleAdaptedMaterial(result[i])} className='fas fa-plus mt-1 mr-2' title='Material adaptado' style={{ cursor: 'pointer', color: '#ec3143' }} aria-hidden='true'></i>
          <i onClick={() => handleDelete(result[i])} className='fas fa-trash mt-1' title='Eliminar sesión' style={{ cursor: 'pointer', color: '#ec3143' }} aria-hidden='true'></i>
        </div>
      );
    }
  }

  function handleEdit(obj) {
    setShowModal({ details: true });
    setIdSession(obj.id);
    setUserName(obj.full_name);
    setSessionDate(obj.start_datetime);
  }

  function handleMaterialToAdapt() {
    // const result = await getParametry(`${BASE_URL}/session`, values);
    const result = [
      {
        full_name: 'German',
        diagnostic: 'Tea',
        document: 'Material a adaptar 1',
        date: 'asdad'
      },
      {
        full_name: 'Lucas',
        diagnostic: 'TDA',
        document: 'Material a adaptar 2',
        date: 'asdad'
      }
    ];
    createActionsMaterial(result);
    fillTableMaterial(result);
    setShowModal({ materialToAdapt: true });
  }

  const handleAdaptedMaterial = () => {
    setShowModal({ adaptInformation: true });
  };

  function createActionsMaterial(result) {
    if (!result) return;
    for (let i = 0; i < result.length; i++) {
      result[i].date = convertDateTime(new Date(result[i].start_datetime));
      result[i].actions = (
        <div>
          <i onClick={() => handleDownloadMaterial(result[i])} className='fas fa-download mt-1' title='Descargar material' style={{ cursor: 'pointer', color: '#388e3c' }} aria-hidden='true'></i>
        </div>
      );
    }
  }

  function fillTableMaterial(result) {
    if (result.length > 0) {
      setTableMaterial({
        columns: [
          { label: '', field: 'actions' },
          { label: 'Nombre', field: 'full_name' },
          { label: 'Dificultad', field: 'diagnostic' },
          { label: 'Material', field: 'document' },
          { label: 'Fecha sesión', field: 'date' }
        ],
        rows: result,
        show: true
      });
      setErrorsMaterial({ show: false });
    } else {
      setTableMaterial({ show: false });
      setErrorsMaterial({ show: true, message: 'No se ha subido material a adaptar' });
    }
    setLoading(false);
  }

  function handleDownloadMaterial(obj) {
    // Descargar PDF
  }

  function handleClose(modal) {
    setShowModal({ [modal]: false });
  }

  function handleDelete(obj) {
    swal(
      <div>
        <p className='h4 mt-4 mb-4'>¿Querés dar de baja la sesión?</p>
        <span>Alumno: {obj.full_name}</span>
        <p>Fecha: {obj.date}</p>
      </div>,
      {
        icon: 'warning',
        input: 'text',
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
    const values = { status: status.Canceled };
    await patchApi(`${BASE_URL}/session`, values, obj.id);
    setLoading(false);
    await showAlert('Sesión eliminada', `La sesión: ${obj.date} ha sido dada de baja`, 'success');
    history.push(`/home`);
  }

  function fillTable(result) {
    if (result && result.length > 0) {
      setTable({
        columns: [
          { label: '', field: 'actions' },
          { label: 'Nombre', field: 'full_name' },
          { label: 'Dificultad', field: 'diagnostic' },
          { label: 'Tipo', field: 'type' },
          { label: 'Fecha sesión', field: 'date' }
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
              {showModal.details && <SessionPendingDetail showModal={showModal} handleClose={handleClose} idSession={idSession} userName={userName} sessionDate={sessionDate} />}
              {showModal.materialToAdapt && <MaterialToAdapt showModal={showModal} handleClose={handleClose} tableToAdapt={tableMaterial} errorAdapt={errorMaterial} />}
              {showModal.adaptInformation && <AdaptedInformation showModal={showModal} handleClose={handleClose} />}
              {table.show && <Table data={table} />}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Index;
