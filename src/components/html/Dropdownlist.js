import React from 'react';
import { Form } from 'react-bootstrap';

const Dropdownlist = ({ title, id, handleChange, value, dropdownlist, disabledValue, className }) => {
  return (
    <React.Fragment>
      <Form.Group>
        <Form.Label> {title} </Form.Label>
        <Form.Control id={id} onChange={handleChange} className={className} value={value} style={{ cursor: 'pointer' }} as='select' disabled={disabledValue}>
          {dropdownlist.map((file) => (
            <option key={file.id} value={file.code}>
              {file.description}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </React.Fragment>
  );
};

export default Dropdownlist;
