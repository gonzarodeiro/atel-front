import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../../utils/layout/index';
import Table from '../../../components/html/Table';
import Loading from '../../../components/Loading';
import Footer from '../../../components/html/Footer';
import Dropdownlist from '../../../components/html/Dropdownlist';
import { dlStatus } from '../../../utils/dropdownlists/index';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import datepicker from '../../../utils/commons/datepicker';
import HistoricalSessionDetails from './modal/HistoricalSessionDetails';
import cleanObject from '../../../utils/commons/cleanObject';
import convertDate from '../../../utils/commons/convertDate';
import convertDateTime from '../../../utils/commons/convertDateTime';
import { BASE_URL } from '../../../config/environment';
import getParametry from '../../../utils/services/get/getByFilters/index';
import getResponseById from '../../../utils/services/get/getById/index';
import getByFilters from '../../../utils/services/get/getByFilters/index';
import { Form } from 'react-bootstrap';
registerLocale('es', datepicker);

const Index = () => {
  const [params, setParams] = useState({ dateFrom: new Date(), dateTo: new Date(), studentName: '', status: '' });
  const [table, setTable] = useState({ columns: [], rows: [], actions: [], show: false });
  const [numericalAritmeticTable, setNumericalAritmeticTable] = useState({ columns: [], rows: [], actions: [], show: false });
  const [numericalMatchesTable, setNumericalMatchesTable] = useState({ columns: [], rows: [], actions: [], show: false });
  const [error, setErrors] = useState({ show: false, message: '' });
  const [sessionDetails, setSessionDetails] = useState();
  const [avgTime, setAvgTime] = useState();
  const [dateDetails, setDateDetails] = useState();
  const [showModal, setShowModal] = useState({ details: false });
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
      id_professional: parseInt(sessionStorage.getItem('idProfessional')),
      status: params.status,
      studentName: params.studentName,
      dateTo: convertDate(params.dateTo),
      dateFrom: convertDate(params.dateFrom)
    };
  }

  function createActions(result) {
    for (let i = 0; i < result.length; i++) {
      result[i].date = convertDateTime(new Date(result[i].start_datetime));
      result[i].actions = (
        <div>
          {result[i].status === 2 && <i onClick={() => handleDetails(result[i])} className='fas fa-eye mt-1' title='Ver detalles' style={{ cursor: 'pointer' }} aria-hidden='true'></i>}

          {result[i].status === 1 && <i className='fas fa-circle mt-1' style={{ color: 'orange' }} aria-hidden='true'></i>}
          {result[i].status === 2 && <i className='fas fa-circle mt-1 ml-2' style={{ color: '#388e3c' }} aria-hidden='true'></i>}
          {result[i].status === 3 && <i className='fas fa-circle mt-1' style={{ color: '#d32f2f' }} aria-hidden='true'></i>}
        </div>
      );
    }
  }

  async function handleDetails(response) {
    let result = await getResponseById(`${BASE_URL}/session/details`, response.id);
    setSessionDetails(result[0]);
    if (result[0].numerical.statistics.aritmetic.length > 0) {
      const aritmeticsRows = convertAritmetic(result[0].numerical.statistics.aritmetic);
      fillAritmeticTable(aritmeticsRows);
    }
    if (result[0].numerical.statistics.matches.length > 0) {
      const matchesRows = convertMatches(result[0].numerical.statistics.matches);
      fillMatchesTable(matchesRows);
    }
    setDateDetails(convertDateTime(new Date(result[0].startDateTime)));
    if (result[0].numerical.statistics.avgTime) setAvgTime(convertMStoMinutes(result[0].numerical.statistics.avgTime));
    setShowModal({ details: true });
  }

  function convertMStoMinutes(avgTime) {
    const min = Math.floor((avgTime / 1000 / 60) << 0),
      sec = Math.floor((avgTime / 1000) % 60);
    return `${min} minutos y ${sec} segundos`;
  }

  function convertAritmetic(obj) {
    const mapKeys = {
      Suma: 'Suma',
      Resta: 'Resta',
      Multiplicacion: 'Multiplicación',
      Division: 'División',
      SinOperacion: 'Matcheo de formas'
    };

    let rows = Object.keys(mapKeys).map((k) => {
      let attempts = obj[k].fails + obj[k].success;
      let percentage = 0;
      if (attempts) percentage = (obj[k].success * 100) / attempts;

      return {
        name: mapKeys[k],
        attempts: attempts,
        fail: obj[k].fails,
        success: obj[k].success,
        percentage: percentage.toFixed(2) + '%'
      };
    });
    return rows;
  }

  function convertMatches(obj) {
    let rows = Object.keys(obj).map((k) => {
      let attempts = obj[k].fails + obj[k].success;
      let percentage = 0;
      if (attempts) percentage = (obj[k].success * 100) / attempts;

      return {
        name: k.charAt(0).toUpperCase() + k.slice(1),
        attempts: attempts,
        fail: obj[k].fails,
        success: obj[k].success,
        percentage: percentage.toFixed(2) + '%'
      };
    });
    return rows;
  }

  function fillAritmeticTable(obj) {
    if (obj) {
      setNumericalAritmeticTable({
        columns: [
          { label: 'Operación', field: 'name' },
          { label: 'Intentos', field: 'attempts' },
          { label: 'Aciertos', field: 'success' },
          { label: 'Errores', field: 'fail' },
          { label: 'Efectividad', field: 'percentage' }
        ],
        rows: obj,
        show: true
      });
    } else {
      setNumericalAritmeticTable({ show: false });
    }
  }

  function fillMatchesTable(obj) {
    if (obj) {
      setNumericalMatchesTable({
        columns: [
          { label: 'Elemento', field: 'name' },
          { label: 'Intentos', field: 'attempts' },
          { label: 'Aciertos', field: 'success' },
          { label: 'Errores', field: 'fail' },
          { label: 'Efectividad', field: 'percentage' }
        ],
        rows: obj,
        show: true
      });
    } else {
      setNumericalMatchesTable({ show: false });
    }
  }

  function handleCloseDetails() {
    setShowModal({ details: false });
  }

  function fillTable(result) {
    if (result.length > 0) {
      setTable({
        columns: [
          { label: '', field: 'actions' },
          { label: 'Alumno', field: 'full_name' },
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
              Histórico de sesiones
            </div>
            <form action='' id='form-inputs' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
              <div className='row pb-1'>
                <div className='col-md-3 my-2'>
                  <label>Fecha Desde</label>
                  <DatePicker id='dateFrom' showYearDropdown scrollableMonthYearDropdown dateFormat='dd/MM/yyyy' placeholderText='Seleccione una fecha' selected={params.dateFrom} todayButton='Hoy' onChange={(date) => setParams({ ...params, dateFrom: date })} value={params.dateFrom} className='form-control' locale='es' />
                </div>
                <div className='col-md-3 my-2'>
                  <label>Fecha Hasta</label>
                  <DatePicker id='dateTo' showYearDropdown scrollableMonthYearDropdown dateFormat='dd/MM/yyyy' placeholderText='Seleccione una fecha' selected={params.dateTo} todayButton='Hoy' onChange={(date) => setParams({ ...params, dateTo: date })} value={params.dateTo} className='form-control' locale='es' />
                </div>
                <div className='col-md-3 my-2'>
                  <Form.Group>
                    <Form.Label> Nombre del alumno </Form.Label>
                    <Form.Control id='name' onChange={handleChange} className='form-control' value={params.name} style={{ cursor: 'pointer' }} as='select' disabled={false}>
                      {apis.dlStudents.map((file) => (
                        <option key={file.id} value={file.fullName}>
                          {file.fullName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>
                <div className='col-md-3 my-2'>
                  <Dropdownlist title='Estado de la sesión' id='status' handleChange={handleChange} value={params.status} dropdownlist={dlStatus} disabledValue={false} className='form-control' />
                </div>
              </div>
              <Footer error={error} onClickPrev={() => history.push(`/home`)} onClickSearch={handleSubmit} />
              {showModal.details && <HistoricalSessionDetails showModal={showModal} handleClose={handleCloseDetails} obj={sessionDetails} date={dateDetails} aritmeticTable={numericalAritmeticTable} matchesTable={numericalMatchesTable} avgTime={avgTime} />}
              {table.show && (
                <div className='animated fadeInUp faster mb-1' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
                  <span>
                    <i className='fas fa-square ml-2' style={{ color: 'orange', marginBottom: '13px', marginLeft: '2px' }}></i> = Pendiente
                  </span>
                  <span>
                    <i className='fas fa-square ml-2' style={{ color: '#388e3c', marginBottom: '13px', marginLeft: '2px' }}></i> = Finalizada
                  </span>
                  <span>
                    <i className='fas fa-square ml-2' style={{ color: '#dd4b39' }}></i> = Cancelada
                  </span>
                  <Table data={table} />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Index;
