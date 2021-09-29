import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import convertDate from '../../../utils/commons/convertDate';
import convertDateTime from '../../../utils/commons/convertDateTime';
import cleanObject from '../../../utils/commons/cleanObject';
import getParametry from '../../../utils/services/get/getByFilters/index';
import status from '../../../utils/enums/sessionStatus';
import Password from './steps/password';
import GeneralInformation from './steps/generalInformation';
import swal from '@sweetalert/with-react';
import showAlert from '../../../utils/commons/showAlert';
import { BASE_URL } from '../../../config/environment';
import deleteResponseApi from '../../../utils/services/delete/deleteResponseApi';

const Index = () => {
  const [params, setParams] = useState({ password: '', dateFrom: new Date(), dateTo: new Date() });
  const [steps, setSteps] = useState({ password: true, generalInformation: false });
  const [table, setTable] = useState({ columns: [], rows: [], actions: [], show: false });
  const [tableDelete, setTableDelete] = useState({ columns: [], rows: [], actions: [], show: false });
  const [error, setErrors] = useState({ show: false, message: '' });
  const [errorsPassword, setErrorsPassword] = useState({ show: false, message: '' });
  const [errorDelete, setErrorsDelete] = useState({ show: false, message: '' });
  const [errorsModal, setErrorsModal] = useState({ show: false, message: '' });
  const [showValidation, setShowValidation] = useState(false);
  const [showModal, setShowModal] = useState({ adaptInformation: false, deleteInformation: false, modalData: {} });
  const [loading, setLoading] = useState(false);
  let { roomId } = useParams();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setParams({ ...params, [id]: value });
  };

  async function handleSubmitPassword() {
    if (!params.password) {
      setErrorsPassword({ show: true, message: 'Debe ingresar la contraseña' });
      setShowValidation(true);
      return;
    }
    const values = createFilters();
    const response = await getParametry(`${BASE_URL}/student/shared/verification`, values);
    if (!response.result) {
      setErrorsPassword({ show: true, message: 'La contraseña ingresada no es válida' });
      setShowValidation(true);
      return;
    }
    setSteps({ password: false, generalInformation: true });
  }

  function createFilters() {
    const fields = roomId.split('-');
    return {
      idStudent: fields[2],
      idProfessional: fields[1],
      name: fields[0],
      password: params.password
    };
  }

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
    const fields = roomId.split('-');
    return {
      id_professional: fields[1],
      status: status.Pending,
      studentId: fields[2],
      dateTo: convertDate(params.dateTo),
      dateFrom: convertDate(params.dateFrom),
      type: 'Sesión de inclusión'
    };
  }

  function createActions(sessions) {
    if (!sessions) return;
    for (let i = 0; i < sessions.length; i++) {
      sessions[i].date = convertDateTime(new Date(sessions[i].start_datetime));
      sessions[i].actions = (
        <div>
          <i onClick={() => handleAdapt(sessions[i])} className='fas fa-plus mt-1 mr-2' title='Agregar material a adaptar' style={{ cursor: 'pointer' }} aria-hidden='true'></i>
          <i onClick={() => showDelete(sessions[i])} className='fas fa-file-alt mt-1' title='Eliminar material' style={{ cursor: 'pointer' }} aria-hidden='true'></i>
        </div>
      );
    }
  }

  function handleAdapt(session) {
    setShowModal({ adaptInformation: true, modalData: session });
  }

  async function showDelete(session) {
    const result = await getParametry(`${BASE_URL}/content`, { sessionID: session.id, author: roomId.split('-')[0] });

    const materialList = result.map((material) => ({
      ...material,
      materialId: material.id,
      ...session,
      start_date: convertDateTime(new Date(session.start_datetime))
    }));

    createActionsDelete(materialList);
    fillTableDelete(materialList);
    setShowModal({ deleteInformation: true });
  }

  function createActionsDelete(materials) {
    for (let i = 0; i < materials.length; i++) {
      materials[i].date = convertDateTime(new Date(materials[i].start_datetime));
      materials[i].actionsMaterials = (
        <div>
          <a href={materials[i].url} target='_blank' rel='noopener noreferrer' download>
            <i onClick={() => handleDownload(materials[i])} className='fas fa-download mt-1 mr-2' title='Descargar material' style={{ cursor: 'pointer' }} aria-hidden='true'></i>
          </a>
          <i onClick={() => handleDeleteMaterial(materials[i])} className='fas fa-trash mt-1' title='Eliminar material' style={{ cursor: 'pointer' }} aria-hidden='true'></i>
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
        <p className='h4 mt-4 mb-4'>¿Querés eliminar el material a adaptar?</p>
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
    setLoading(true);
    await deleteResponseApi(`${BASE_URL}/document/${material.materialId}`);
    setLoading(false);
    await showAlert('Material eliminado', `Se ha eliminado el material para el dia: ${material.date}`, 'success');
    handleClose('deleteInformation');
  }

  function fillTableDelete(materials) {
    if (materials.length > 0) {
      setTableDelete({
        columns: [
          { label: '', field: 'actionsMaterials' },
          { label: 'Alumno', field: 'full_name' },
          { label: 'Material', field: 'original_name' },
          { label: 'Subido por', field: 'author' },
          { label: 'Comentarios', field: 'comment' },
          { label: 'Fecha sesión', field: 'start_date' }
        ],
        rows: materials,
        show: true
      });
      setErrorsDelete({ show: false });
    } else {
      setTableDelete({ show: false });
      setErrorsDelete({ show: true, message: 'No se ha subido material a adaptar' });
    }
    setLoading(false);
  }

  function handleClose(modal) {
    setShowModal({ [modal]: false });
  }

  function fillTable(sessions) {
    if (sessions.length > 0) {
      setTable({
        columns: [
          { label: '', field: 'actions' },
          { label: 'Alumno', field: 'full_name' },
          { label: 'Dificultad', field: 'diagnostic' },
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

  return (
    <>
      <div className='card shadow-sm container px-0' style={{ border: '1px solid #cecbcb', marginTop: '30px' }}>
        <div className='container'>
          {loading && (
            <div className={'w-100 h-100 position-absolute d-flex bg-white align-items-center justify-content-center animated'} style={{ left: 0, top: 0, zIndex: 3 }}>
              <Loading />
            </div>
          )}
          <div className='card-body pb-3'>
            <div className='card-title pb-3 border-bottom h5 text-muted' style={{ fontSize: '16px', fontWeight: 'bold' }}>
              Sesiones a adaptar
            </div>
            <form action='' id='form-inputs' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
              {steps.password && <Password params={params} handleChange={handleChange} showValidation={showValidation} errors={errorsPassword} handleSubmit={handleSubmitPassword} />}
              {steps.generalInformation && <GeneralInformation author={roomId.split('-')[0]} params={params} error={error} table={table} setParams={setParams} handleSubmit={handleSubmit} showModal={showModal} handleClose={handleClose} setShowValidation={setShowValidation} setErrorsModal={setErrorsModal} errorsModal={errorsModal} tableDelete={tableDelete} errorDelete={errorDelete} />}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Index;
