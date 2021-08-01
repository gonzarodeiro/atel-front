import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../../utils/layout/index';
import Table from '../../../components/html/Table';
import Loading from '../../../components/Loading';
import Footer from '../../../components/html/Footer';
import Dropdownlist from '../../../components/html/Dropdownlist';
import { dlStudents, dlStatus } from '../../../utils/dropdownlists/index';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import datepicker from '../../../utils/commons/datepicker';
import HistoricalSessionDetails from './modal/HistoricalSessionDetails';
registerLocale('es', datepicker);

const Index = () => {
  const [params, setParams] = useState({ dateFrom: new Date(), dateTo: new Date(), studentName: '', status: '', message: '' });
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
    const result = [
      {
        name: 'German Perez',
        difficulty: 'TEA',
        status: 'Finalizada',
        type: 'Personal',
        date: '01/06/2021 14:00 hs'
      },
      {
        name: 'Augusto Gomez',
        difficulty: 'Dislexia',
        status: 'Finalizada',
        type: 'Inclusión',
        date: '05/06/2021 16:00 hs'
      },
      {
        name: 'Lucas Gomez',
        difficulty: 'TDA',
        status: 'Cancelada',
        type: 'Inclusión',
        date: '12/06/2021 16:00 hs'
      }
    ];
    createActions(result);
    fillTable(result);
  }

  function createActions(result) {
    for (let i = 0; i < result.length; i++) {
      result[i].actions = (
        <div>
          {result[i].status === 'Finalizada' && <i onClick={() => handleDetails(result[i])} className='fas fa-eye mt-1' title='Ver detalles' style={{ cursor: 'pointer' }} aria-hidden='true'></i>}
          {result[i].status === 'Cancelada' && <i onClick={() => handleObservation(result[i])} className='fas fa-eye mt-1' title='Ver detalles' style={{ cursor: 'pointer' }} aria-hidden='true'></i>}
          {result[i].status === 'Finalizada' && <i className='fas fa-circle mt-1 ml-2' style={{ color: '#388e3c' }} aria-hidden='true'></i>}
          {result[i].status === 'Cancelada' && <i className='fas fa-circle mt-1 ml-2' style={{ color: '#d32f2f' }} aria-hidden='true'></i>}
        </div>
      );
    }
  }

  function handleDetails() {
    setShowModal({ details: true });
  }

  function handleObservation() {}

  function handleCloseDetails() {
    setShowModal({ details: false });
  }

  function fillTable(result) {
    if (result.length > 0) {
      setTable({
        columns: [
          { label: '', field: 'actions' },
          { label: 'Nombre', field: 'name' },
          { label: 'Dificultad', field: 'difficulty' },
          { label: 'Estado', field: 'status' },
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
                  <Dropdownlist title='Nombre del alumno' id='name' handleChange={handleChange} value={params.name} dropdownlist={dlStudents} disabledValue={false} className='form-control' />
                </div>
                <div className='col-md-3 my-2'>
                  <Dropdownlist title='Estado de la sesión' id='status' handleChange={handleChange} value={params.status} dropdownlist={dlStatus} disabledValue={false} className='form-control' />
                </div>
              </div>
              <Footer error={error} onClickPrev={() => history.push(`/home`)} onClickSearch={handleSubmit} />
              {showModal.details && <HistoricalSessionDetails showModal={showModal} handleClose={handleCloseDetails} />}
              {table.show && (
                <div className='animated fadeInUp faster mb-1' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
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
