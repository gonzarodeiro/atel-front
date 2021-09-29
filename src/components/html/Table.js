import React from 'react';
import { MDBDataTable } from 'mdbreact';

const Table = ({ data, paging }) => {
  return (
    <div className='animated fadeInUp faster text-center mb-1'>
      <div className='control-pane'>
        <div className='control-section'>
          <MDBDataTable displayEntries={false} sortable={false} searching={false} theadColor='blue darken-2' striped bordered theadTextWhite small hover data={data} noBottomColumns responsive info={false} paging={!paging ? true : false} paginationLabel={['Anterior', 'Siguiente']} />
        </div>
      </div>
    </div>
  );
};

export default Table;
