import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../../utils/layout/index';
import Table from '../../../components/html/Table';
import Loading from '../../../components/Loading';
import Footer from '../../../components/html/Footer';
import Dropdownlist from '../../../components/html/Dropdownlist';
import { dlStudents, dlSessionType } from '../../../utils/dropdownlists/index';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import datepicker from '../../../utils/commons/datepicker';
import convertDate from '../../../utils/commons/convertDate';
import convertDateTime from '../../../utils/commons/convertDateTime';
import cleanObject from '../../../utils/commons/cleanObject';
import swal from '@sweetalert/with-react';
import getParametry from '../../../utils/services/get/getByFilters/index';
import patchApi from '../../../utils/services/patch/patchApi';
import status from '../../../utils/enums/sessionStatus';
import showAlert from '../../../utils/commons/showAlert';
import { BASE_URL } from '../../../config/environment';
import deleteResponseApi from '../../../utils/services/delete/deleteResponseApi';
import SessionDetail from './modal/SessionDetail';
import ImportMaterial from './modal/ImportMaterial';
import DownloadMaterial from './modal/DownloadMaterial';
registerLocale('es', datepicker);

const Index = () => {
  const [params, setParams] = useState({ dateFrom: new Date(), dateTo: new Date(), studentName: '', type: '' });
  const [table, setTable] = useState({ columns: [], rows: [], actions: [], show: false });
  const [tableMaterial, setTableMaterial] = useState({ columns: [], rows: [], actions: [], show: false });
  const [error, setErrors] = useState({ show: false, message: '' });
  const [errorMaterial, setErrorsMaterial] = useState({ show: false, message: '' });
  const [showModal, setShowModal] = useState({ details: false, importMaterial: false, downloadMaterial: false });
  const [modalData, setModalData] = useState();
  const [idSession, setIdSession] = useState();
  const [userName, setUserName] = useState();
  const [sessionDate, setSessionDate] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
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
    createScheduleActions(result);
    fillTable(result);
  }

  function getParameters() {
    return {
      id_professional: parseInt(sessionStorage.getItem('idProfessional')),
      status: status.Pending,
      studentName: params.studentName,
      type: params.type,
      dateTo: convertDate(params.dateTo),
      dateFrom: convertDate(params.dateFrom)
    };
  }

  function createScheduleActions(sessions) {
    if (!sessions) return;
    for (let i = 0; i < sessions.length; i++) {
      sessions[i].date = convertDateTime(new Date(sessions[i].start_datetime));
      sessions[i].actions = (
        <div>
          <i onClick={() => handleEditSchedule(sessions[i])} className='fas fa-pencil-alt mt-1 mr-2' title='Editar sesión' style={{ cursor: 'pointer', color: '#1976d2' }} aria-hidden='true'></i>
          {sessions[i].type === 'Sesión de inclusión' && <i onClick={() => handleDownloadMaterial(sessions[i])} className='fas fa-file-alt mt-1 mr-2' title='Ver material de la sesión' style={{ cursor: 'pointer', color: '#388e3c' }} aria-hidden='true'></i>}
          <i onClick={() => handleDeleteSchedule(sessions[i])} className='fas fa-trash mt-1' title='Eliminar sesión' style={{ cursor: 'pointer', color: '#dc3545' }} aria-hidden='true'></i>
        </div>
      );
    }
  }

  function fillTable(sessions) {
    if (sessions && sessions.length > 0) {
      setTable({
        columns: [
          { label: '', field: 'actions' },
          { label: 'Alumno', field: 'full_name' },
          { label: 'Dificultad', field: 'diagnostic' },
          { label: 'Tipo', field: 'type' },
          { label: 'Fecha sesión', field: 'date' }
        ],
        rows: sessions,
        show: true
      });
      setErrors({ show: false });
    } else {
      setTable({ show: false });
      setErrors({ show: true, message: 'No hay información para mostrar' });
    }
    setLoading(false);
  }

  function handleEditSchedule(session) {
    setShowModal({ details: true });
    setIdSession(session.id);
    setUserName(session.full_name);
    setSessionDate(session.start_datetime);
  }

  function handleDeleteSchedule(session) {
    swal(
      <div>
        <p className='h4 mt-4 mb-4'>¿Querés dar de baja la sesión?</p>
        <span>Alumno: {session.full_name}</span>
        <p>Fecha: {session.date}</p>
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
      if (value === 'delete') patchSchedule(session);
    });
  }

  async function patchSchedule(session) {
    setLoading(true);
    const values = { status: status.Canceled };
    await patchApi(`${BASE_URL}/session`, session.id, values);
    setLoading(false);
    await showAlert('Sesión eliminada', `La sesión: ${session.date} ha sido dada de baja`, 'success');
    history.push(`/home`);
  }

  async function handleDownloadMaterial(session) {
    const result = await getParametry(`${BASE_URL}/content`, { sessionID: session.id });
    const materialList = result.map((material) => ({
      ...material,
      materialId: material.id,
      ...session,
      start_date: convertDateTime(new Date(session.start_datetime))
    }));

    createMaterialActions(materialList);
    fillTableMaterial(materialList);
    setModalData(session);
    setShowModal({ downloadMaterial: true });
  }

  function createMaterialActions(materials) {
    if (!materials) return;
    for (let i = 0; i < materials.length; i++) {
      materials[i].date = convertDateTime(new Date(materials[i].start_datetime));
      materials[i].actionsMaterials = (
        <div>
          <a href={materials[i].url} target='_blank' rel='noopener noreferrer' download>
            <i onClick={() => handleDownload(materials[i])} className='fas fa-download mt-1' title='Descargar material' style={{ cursor: 'pointer' }} aria-hidden='true'></i>
          </a>
          <i onClick={() => handleDeleteMaterial(materials[i])} className='fas fa-trash mt-1 ml-2' title='Eliminar Material' style={{ cursor: 'pointer' }} aria-hidden='true'></i>
          {materials[i].author === sessionStorage.getItem('name') ? <i className='fas fa-circle mt-1 ml-2' style={{ color: '#388e3c' }} aria-hidden='true'></i> : <i className='fas fa-circle mt-1 ml-2' style={{ color: 'orange' }} aria-hidden='true'></i>}
        </div>
      );
    }
  }

  function handleDownload(material) {
    // Si fuese necesario descargar el material
    // a traves de nu endpoint, implementarlo aquí
  }

  function handleDeleteMaterial(material) {
    swal(
      <div>
        <p className='h4 mt-4 mb-4'>¿Querés eliminar el material?</p>
        <span>Alumno: {material.full_name}</span>
        <p>Documento: {material.original_name}</p>
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
      if (value === 'delete') deleteMaterial(material);
    });
  }

  async function deleteMaterial(material) {
    setLoadingDownload(true);
    await deleteResponseApi(`${BASE_URL}/document/${material.materialId}`);
    setLoadingDownload(false);
    await showAlert('Material eliminado', `Se ha eliminado el material para el dia: ${material.date}`, 'success');
    handleClose('deleteInformation');
  }

  function fillTableMaterial(materials) {
    if (materials.length > 0) {
      setTableMaterial({
        columns: [
          { label: '', field: 'actionsMaterials' },
          { label: 'Alumno', field: 'full_name' },
          { label: 'Subido por', field: 'author' },
          { label: 'Material', field: 'original_name' },
          { label: 'Comentarios', field: 'comment' },
          { label: 'Fecha sesión', field: 'date' }
        ],
        rows: materials,
        show: true
      });
      setErrorsMaterial({ show: false });
    } else {
      setTableMaterial({ show: false });
      setErrorsMaterial({ show: true, message: 'Por el momento no se ha subido material para esta sesión' });
    }
    setLoading(false);
  }

  function handleClose(modal) {
    setShowModal({ [modal]: false });
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
                  <Dropdownlist title='Tipo de sesiones' id='type' handleChange={handleChange} value={params.type} dropdownlist={dlSessionType} disabledValue={false} className='form-control' />
                </div>
              </div>
              <Footer error={error} onClickPrev={() => history.push(`/home`)} onClickSearch={handleSubmit} />
              {showModal.details && <SessionDetail showModal={showModal} handleClose={handleClose} idSession={idSession} userName={userName} sessionDate={sessionDate} />}
              {showModal.downloadMaterial && <DownloadMaterial loadingDownload={loadingDownload} showModal={showModal} handleClose={handleClose} tableToAdapt={tableMaterial} errorAdapt={errorMaterial} setShowModal={setShowModal} />}
              {showModal.importMaterial && <ImportMaterial modalData={modalData} showModal={showModal} handleClose={handleClose} setShowModal={setShowModal} />}
              {table.show && <Table data={table} />}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Index;
