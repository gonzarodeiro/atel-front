import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Cancel from '../../../../html/button/Cancel';
import Submit from '../../../../html/button/Submit';
import Dropdownlist from '../../../../html/Dropdownlist';
import { fruits, operationTypes, containerTypes, animals } from './constants';
import { dlAnimals, dlContainerCount, dlContainerCapacity, dlContainerTypes, dlFruits, dlOperations } from './dropdownlists';

export const modalResults = {
  OK: 1,
  CANCEL: 2
};

const defaultContainerCount = 2;
const fixedContainerCountForArithmethics = 2;
const initialSettings = {
  operation: operationTypes.NONE,
  containers: {
    count: defaultContainerCount,
    items: [
      {
        id: 0,
        type: containerTypes.FRUIT,
        subType: fruits.BANANA,
        capacity: 3
      },
      {
        id: 1,
        type: containerTypes.FRUIT,
        subType: fruits.BANANA,
        capacity: 3
      }
    ]
  }
};

function newContainersArray(count) {
  const containers = initialSettings.containers;
  const containerToRepeat = containers.items[0];
  const newContainers = [];
  for (let i = 0; i < count; i++) {
    newContainers.push({
      ...containerToRepeat
    });
  }
  const containersWithIds = newContainers.map((c, index) => ({
    ...c,
    id: index
  }));
  return containersWithIds;
}

const Settings = ({ show, onClose }) => {
  const [settings, setSettings] = useState(initialSettings);
  const handleClose = (mr) => (mr === modalResults.OK ? onClose(mr, settings) : onClose(mr));

  const handleOperationsChange = (e) => {
    // exit when getting invalid envents
    if (!e || !e.target) return;

    const operation = e.target.value;

    // make a copy of the state
    const newSettings = { ...settings };

    // mutate the copy
    if (operation !== operationTypes.NONE) {
      const count = fixedContainerCountForArithmethics;
      newSettings.operation = operation;
      newSettings.containers.count = count;
      newSettings.containers.items = newContainersArray(count);
    } else {
      newSettings.operation = operation;
    }

    // set the copy as the new state
    setSettings(newSettings);
  };

  const handleContainerCountChange = (e) => {
    // exit when getting invalid envents
    if (!e || !e.target) return;

    const count = e.target.value;

    // make a copy of the state
    const newSettings = { ...settings };

    // mutate the copy
    newSettings.containers.count = count;
    newSettings.containers.items = newContainersArray(count);

    // set the copy as the new state
    setSettings(newSettings);
  };

  const handleContainerTypeChange = (e, index) => {
    // exit when getting invalid envents
    if (!e || !e.target) return;

    const type = e.target.value;

    // make a copy of the state
    const newSettings = { ...settings };

    // check index range
    if (!newSettings.containers || !newSettings.containers.items) return;
    if (index < 0 || index >= newSettings.containers.items.length) return;

    // mutate the copy
    const container = newSettings.containers.items[index];
    container.type = type;

    // need to set the subType back
    // to a value acording to de new type
    switch (container.type) {
      case containerTypes.FRUIT:
        container.subType = fruits.BANANA;
        break;
      case containerTypes.ANIMAL:
        container.subType = animals.CAT;
        break;
      default:
        container.subType = animals.NONE;
    }

    // set the copy as the new state
    setSettings(newSettings);
  };

  const handleContainerSubtypeChange = (e, index) => {
    // exit when getting invalid envents
    if (!e || !e.target) return;

    const subType = e.target.value;

    // make a copy of the state
    const newSettings = { ...settings };

    // check index range
    if (!newSettings.containers || !newSettings.containers.items) return;
    if (index < 0 || index >= newSettings.containers.items.length) return;

    // mutate the copy
    const container = newSettings.containers.items[index];
    container.subType = subType;

    // set the copy as the new state
    setSettings(newSettings);
  };

  const handleContainerCapacityChange = (e, index) => {
    // exit when getting invalid envents
    if (!e || !e.target) return;

    const capacity = e.target.value;

    // make a copy of the state
    const newSettings = { ...settings };

    // check index range
    if (!newSettings.containers || !newSettings.containers.items) return;
    if (index < 0 || index >= newSettings.containers.items.length) return;

    // mutate the copy
    const container = newSettings.containers.items[index];
    container.capacity = capacity;

    // set the copy as the new state
    setSettings(newSettings);
  };

  return (
    <Modal show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Configurar actividad</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Dropdownlist title='Operación aritmética' id='operation' handleChange={handleOperationsChange} value={settings.operation} dropdownlist={dlOperations} disabledValue={false} className={'form-control'} />
        <Dropdownlist title='Numero de contenedores' id='containers' handleChange={handleContainerCountChange} value={settings.containers.count} dropdownlist={dlContainerCount} disabledValue={settings.operation !== operationTypes.NONE} className={'form-control'} />
        {settings &&
          settings.containers &&
          settings.containers.items &&
          settings.containers.items.map((container, index) => (
            <div key={container.id}>
              <p>{`Contenedor ${index + 1}`}</p>
              <div className='row mt-1 mb-2 align-items-md-end'>
                <div className='col-md-4 mb-2'>
                  <Dropdownlist title='Tipo' id='containerType' handleChange={(e) => handleContainerTypeChange(e, index)} value={container.type} dropdownlist={dlContainerTypes} disabledValue={false} className={'form-control'} />
                </div>
                {container && container.type === containerTypes.FRUIT && (
                  <div className='col-md-4 mb-2'>
                    <Dropdownlist title='Subtipo' id='fruits' handleChange={(e) => handleContainerSubtypeChange(e, index)} value={container.subType} dropdownlist={dlFruits} disabledValue={false} className={'form-control'} />
                  </div>
                )}
                {container && container.type === containerTypes.ANIMAL && (
                  <div className='col-md-4 mb-2'>
                    <Dropdownlist title='Subtipo' id='animals' handleChange={(e) => handleContainerSubtypeChange(e, index)} value={container.subType} dropdownlist={dlAnimals} disabledValue={false} className={'form-control'} />
                  </div>
                )}
                <div className='col-md-4 mb-2'>
                  <Dropdownlist title='Capacidad' id='capacity' handleChange={(e) => handleContainerCapacityChange(e, index)} value={container.capacity} dropdownlist={dlContainerCapacity} disabledValue={false} className={'form-control'} />
                </div>
              </div>
            </div>
          ))}
      </Modal.Body>

      <Modal.Footer>
        <Cancel onClick={() => handleClose(modalResults.CANCEL)} title='Cancelar' />
        <Submit onClick={() => handleClose(modalResults.OK)} title='Aplicar' />
      </Modal.Footer>
    </Modal>
  );
};

export default Settings;
