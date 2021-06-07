import React from 'react';
import { MDBDataTable } from 'mdbreact';

const Table = (props) => {
  return (
    <div className='animated fadeInUp faster text-center'>
      <div className='control-pane'>
        <div className='control-section'>
          <MDBDataTable displayEntries={false} sortable={false} searching={false} theadColor='blue darken-2' striped bordered theadTextWhite small hover data={props.data} noBottomColumns responsive info={false} paginationLabel={['Anterior', 'Siguiente']} />
        </div>
      </div>
    </div>
  );
};

export default Table;
