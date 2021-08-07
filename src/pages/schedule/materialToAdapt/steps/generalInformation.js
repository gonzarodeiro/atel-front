import React from 'react';
import Search from '../../../../components/html/button/Search';
import Table from '../../../../components/html/Table';
import datepicker from '../../../../utils/commons/datepicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import AdaptInformation from '../modal/AdaptInformation';
import DeleteInformation from '../modal/DeleteInformation';
registerLocale('es', datepicker);

const GeneralInformation = ({ author, params, error, table, setParams, handleSubmit, showModal, handleClose, setShowValidation, setErrorsModal, errorsModal, tableDelete, errorDelete }) => {
  return (
    <React.Fragment>
      <form action='' id='form-inputs' style={{ fontSize: '13px', fontWeight: 'bold', color: '#66696b' }}>
        <div className='row pb-1'>
          <div className='col-md-6 my-2'>
            <label>Fecha Desde</label>
            <DatePicker id='dateFrom' minDate={new Date()} showYearDropdown scrollableMonthYearDropdown dateFormat='dd/MM/yyyy' placeholderText='Seleccione una fecha' selected={params.dateFrom} todayButton='Hoy' onChange={(date) => setParams({ ...params, dateFrom: date })} value={params.dateFrom} className='form-control' locale='es' />
          </div>
          <div className='col-md-6 my-2'>
            <label>Fecha Hasta</label>
            <DatePicker id='dateTo' minDate={new Date()} showYearDropdown scrollableMonthYearDropdown dateFormat='dd/MM/yyyy' placeholderText='Seleccione una fecha' selected={params.dateTo} todayButton='Hoy' onChange={(date) => setParams({ ...params, dateTo: date })} value={params.dateTo} className='form-control' locale='es' />
          </div>
        </div>
        <div className='row align-items-center d-flex flex-column-reverse flex-md-row pb-3'>
          <div className='col-md-8 my-2'>{error.show === true && <div className='text-danger p-2 rounded w-100 animated bounceInLeft faster errorMessage'>* {error.message}</div>}</div>
          <div className='col-md-4 my-2 d-flex justify-content-center justify-content-md-end my-2'>
            <Search onClick={handleSubmit} />
          </div>
        </div>
        {showModal.adaptInformation && <AdaptInformation author={author} showModal={showModal} handleClose={handleClose} setShowValidation={setShowValidation} setErrorsModal={setErrorsModal} errorsModal={errorsModal} />}
        {showModal.deleteInformation && <DeleteInformation showModal={showModal} handleClose={handleClose} tableDelete={tableDelete} errorDelete={errorDelete} />}
        {table.show && <Table data={table} />}
      </form>
    </React.Fragment>
  );
};

export default GeneralInformation;
