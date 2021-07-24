import React, { useState } from 'react';
import Loading from '../../../components/Loading';
import convertDate from '../../../utils/commons/convertDate';
import convertDateTime from '../../../utils/commons/convertDateTime';
import cleanObject from '../../../utils/commons/cleanObject';
import getParametry from '../../../utils/services/get/getByFilters/index';
import status from '../../../utils/enums/sessionStatus';
import Password from './steps/password';
import GeneralInformation from './steps/generalInformation';

const Index = () => {
  const [params, setParams] = useState({ password: '', dateFrom: new Date(), dateTo: new Date() });
  const [steps, setSteps] = useState({ password: true, generalInformation: false });
  const [table, setTable] = useState({ columns: [], rows: [], actions: [], show: false });
  const [error, setErrors] = useState({ show: false, message: '' });
  const [errorsPassword, setErrorsPassword] = useState({ show: false, message: '' });
  const [showValidation, setShowValidation] = useState(false);
  const [showModal, setShowModal] = useState({ adaptInformation: false });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setParams({ ...params, [id]: value });
  };

  function handleSubmitPassword() {
    if (!params.password) {
      setErrorsPassword({ show: true, message: 'Debe ingresar la contraseña' });
      setShowValidation(true);
      return;
    }
    // chequear si la contraseña que ingreso es valida
    // const result = await getParametry('https://atel-back-stg.herokuapp.com/session', values);
    if (params.password !== 'Gonza') {
      setErrorsPassword({ show: true, message: 'La contraseña ingresada no es válida' });
      setShowValidation(true);
      return;
    }
    setSteps({ password: false, generalInformation: true });
  }

  function handleSubmit() {
    setLoading(true);
    getSchedule();
  }

  async function getSchedule() {
    const values = getParameters();
    cleanObject(values);
    // const result = await getParametry('https://atel-back-stg.herokuapp.com/session', values);
    const result = [
      {
        full_name: 'German',
        diagnostic: 'Tea',
        date: 'asdad'
      },
      {
        full_name: 'Lucas',
        diagnostic: 'TDA',
        date: 'asdad'
      }
    ];
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
      result[i].date = convertDateTime(new Date(result[i].start_datetime));
      result[i].actions = (
        <div>
          <i onClick={() => handleAdapt(result[i])} className='fas fa-pencil-alt mt-1 mr-2' title='Adaptar contenido a la sesión' style={{ cursor: 'pointer' }} aria-hidden='true'></i>
        </div>
      );
    }
  }

  function handleAdapt() {
    setShowModal({ adaptInformation: true });
  }

  function handleClose() {
    setShowModal({ adaptInformation: false });
  }

  function fillTable(result) {
    if (result.length > 0) {
      setTable({
        columns: [
          { label: '', field: 'actions' },
          { label: 'Nombre', field: 'full_name' },
          { label: 'Dificultad', field: 'diagnostic' },
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
              {steps.generalInformation && <GeneralInformation params={params} error={error} table={table} setParams={setParams} handleSubmit={handleSubmit} showModal={showModal} handleClose={handleClose} />}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Index;
