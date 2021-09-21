import { Button } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import PictoList from './components/PictoList';
import Stripe from './components/Stripe';
import { searchText, normalizeStudentPictograms } from '../../../utils/pictogramManager';
import { BASE_URL } from '../../../config/environment';
import getByFilters from '../../../utils/services/get/getByFilters/index';
import './styles.css';

const MAX_STRIPE_LENGTH = 5;
const SERVICE_PH = 'No hay resultados';
const CUSTOM_PH = 'No hay pictogramas en la plantilla del alumno';

export const modalResults = {
  OK: 1,
  CANCEL: 2
};

let timer;
const Pictograms = ({ show, idStudent, idProfessional, onClose }) => {
  const inputRef = useRef();
  const [loadingService, setLoadingService] = useState(false);
  const [loadingCustom, setLoadingCustom] = useState(false);
  const [stripe, setStripe] = useState([]);
  const [servicePictos, setServicePictograms] = useState();
  const [customPictos, setCustomPictograms] = useState();

  useEffect(() => {
    getPictosFromStudentTemplate();
  }, []);

  function handlePictogramClick(picto) {
    setStripe((stripe) => (stripe.length < MAX_STRIPE_LENGTH ? [...stripe, picto] : stripe));
  }

  function handleKeyPress(event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      console.log('DBG', 'termine de tipear');
      getPictosFromSearch();
    }, 3000);
  }

  function handleClearClick() {
    setStripe(() => []);
  }

  function handleBackspaceClick() {
    if (!inputRef.current) return;
    inputRef.current.value = '';
    getPictosFromSearch();
  }

  async function getPictosFromStudentTemplate() {
    setLoadingCustom(true);
    try {
      const filters = { id_professional: idProfessional, id_student: idStudent };
      const response = await getByFilters(`${BASE_URL}/pictogram/`, filters);
      const newPictos = normalizeStudentPictograms(response);
      setCustomPictograms(newPictos);
    } catch {
      console.log('error getting pictos from student template');
    }
    setLoadingCustom(false);
  }

  async function getPictosFromSearch() {
    if (!inputRef.current) return;
    setLoadingService(true);
    try {
      let value = inputRef.current.value;
      let search = value.trim();
      if (!search) {
        setServicePictograms([]);
      } else {
        const response = await searchText(search);
        const newPictos = response.words;
        setServicePictograms(newPictos);
      }
    } catch {
      console.log('error getting pictos from student template');
    }
    setLoadingService(false);
  }

  return (
    show && (
      <div className='pic-container'>
        {/* Tira de pictogramas */}
        <div className='pic-stripe-outer-container'>
          <button className='pic-btn-clear' onClick={handleClearClick} disabled={!stripe.length}>
            <i className='fas fa-times-circle pic-send-icon' />
          </button>
          <Stripe stripe={stripe} />
          <button className='pic-btn-send' onClick={() => onClose(modalResults.OK, stripe)} disabled={!stripe.length}>
            <i className='fas fa-check-circle' />
          </button>
        </div>
        {/* buscador por palabras */}
        <div className='pic-tool-bar'>
          <div className='pic-input-container'>
            <input class='pic-input-text' type='text' autoFocus placeholder='Escribe para buscar pictogramas' ref={inputRef} onKeyPress={handleKeyPress} />
            <i className='fas fa-times pic-backspace-icon' onClick={handleBackspaceClick}></i>
          </div>
          <div className='pic-btn-container'>
            <Button className='pic-btn mt-2' variant='primary' onClick={() => onClose(modalResults.CANCEL)}>
              VOLVER
            </Button>
          </div>
        </div>
        {/* listas de pictogramas */}
        <PictoList pictos={servicePictos} onItemClick={handlePictogramClick} labelText={'Búsqueda'} placeholderText={SERVICE_PH} loading={loadingService} />
        <PictoList pictos={customPictos} onItemClick={handlePictogramClick} labelText={'Plantilla'} placeholderText={CUSTOM_PH} loading={loadingCustom} />
      </div>
    )
  );
};

export default Pictograms;
