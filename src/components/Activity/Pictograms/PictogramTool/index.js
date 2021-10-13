import { Button } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import PictoList from '../components/PictoList';
import Stripe from '../components/Stripe';
import { searchText, normalizeStudentPictograms } from '../../../../utils/pictogramManager';
import { BASE_URL } from '../../../../config/environment';
import getByFilters from '../../../../utils/services/get/getByFilters/index';
import './styles.css';
import postApi from '../../../../utils/services/post/postApi';
import { clientEvents, registerEvent, sendMessage } from '../../../../utils/socketManager';
import deleteResponseApi from '../../../../utils/services/delete/deleteResponseApi';

const MAX_STRIPE_LENGTH = 5;
const SEARCH_PH = 'No hay resultados';
const TEMAPLATE_PH = 'No hay pictogramas en la plantilla del alumno';

export const modalResults = {
  OK: 1,
  CANCEL: 2
};

export const pictogramModes = {
  PROFESSIONAL: 0,
  STUDENT: 1
};

let timer;
const Pictograms = ({ show, idStudent, idProfessional, mode, onClose }) => {
  const inputRef = useRef();
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingTemplate, setLoadingTemplate] = useState(false);
  const [stripe, setStripe] = useState([]);
  const [searchPictos, setSearchPictograms] = useState();
  const [templatePictos, setTemplatePictograms] = useState();

  useEffect(() => {
    getPictosFromStudentTemplate();

    registerEvent(() => {
      // client events are received by all members
      // in the room except the for sender
      getPictosFromStudentTemplate();
    }, clientEvents.reloadPictogramsTemplate);
  }, []);

  function handlePictogramClick(picto) {
    setStripe((stripe) => (stripe.length < MAX_STRIPE_LENGTH ? [...stripe, picto] : stripe));
  }

  function handlePictogramClickAdd(picto) {
    postPictoToStudentTemplate(picto);
  }

  function handlePictogramClickRemove(picto) {
    deletePictoFromStudentTemplate(picto);
  }

  function handleKeyPress(event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
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
    setLoadingTemplate(true);
    try {
      const filters = { id_professional: idProfessional, id_student: idStudent };
      const response = await getByFilters(`${BASE_URL}/pictogram/`, filters);
      const newPictos = normalizeStudentPictograms(response);
      setTemplatePictograms(newPictos);
    } catch {
      console.log('error getting pictos from student template');
    }
    setLoadingTemplate(false);
  }

  async function postPictoToStudentTemplate(picto) {
    const source = picto.sources[0];
    try {
      if (!source) throw new Error('no source url');
      const data = { pictograms: [source] };
      await postApi(`${BASE_URL}/pictogram?id_student=${idStudent}&id_professional=${idProfessional}`, data);
      sendMessage(clientEvents.reloadPictogramsTemplate);
      getPictosFromStudentTemplate();
    } catch {
      console.log('error posting pictos from student template');
    }
  }

  async function deletePictoFromStudentTemplate(picto) {
    const source = picto.sources[0];
    try {
      if (!source) throw new Error('no source url');
      await deleteResponseApi(`${BASE_URL}/pictogram?id_student=${idStudent}&id_professional=${idProfessional}&pictogram_url=${source}`);
      sendMessage(clientEvents.reloadPictogramsTemplate);
      getPictosFromStudentTemplate();
    } catch {
      console.log('error deleting picto from student template');
    }
  }

  async function getPictosFromSearch() {
    if (!inputRef.current) return;
    setLoadingSearch(true);
    try {
      let value = inputRef.current.value;
      let search = value.trim();
      if (!search) {
        setSearchPictograms([]);
      } else {
        const response = await searchText(search);
        const newPictos = response.words;
        setSearchPictograms(newPictos);
      }
    } catch {
      console.log('error getting pictos from student template');
    }
    setLoadingSearch(false);
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
            {mode === pictogramModes.PROFESSIONAL ? (
              <>
                <input class='pic-input-text' type='text' autoFocus placeholder='Escribe para buscar pictogramas' ref={inputRef} onKeyPress={handleKeyPress} />
                <i className='fas fa-times pic-backspace-icon' onClick={handleBackspaceClick}></i>
              </>
            ) : (
              <p class='pic-title'>Tus pictogramas</p>
            )}
          </div>
          <div className='pic-btn-container'>
            <Button className='pic-btn mt-2' variant='primary' onClick={() => onClose(modalResults.CANCEL)}>
              VOLVER
            </Button>
          </div>
        </div>
        {/* listas de pictogramas */}
        {mode === pictogramModes.PROFESSIONAL && <PictoList pictos={searchPictos} onItemClick={handlePictogramClick} onItemClickAdd={handlePictogramClickAdd} labelText={'Búsqueda'} placeholderText={SEARCH_PH} loading={loadingSearch} addItemVisible />}
        {mode === pictogramModes.PROFESSIONAL ? <PictoList pictos={templatePictos} onItemClick={handlePictogramClick} onItemClickRemove={handlePictogramClickRemove} labelText={'Plantilla'} placeholderText={TEMAPLATE_PH} loading={loadingTemplate} removeItemVisible /> : <PictoList pictos={templatePictos} onItemClick={handlePictogramClick} labelText={'Plantilla'} placeholderText={TEMAPLATE_PH} loading={loadingTemplate} />}
      </div>
    )
  );
};

export default Pictograms;
