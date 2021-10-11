import React, { useEffect, useRef, useState } from 'react';
import { BASE_URL } from '../../../../config/environment';
import { normalizeStudentPictograms, searchText } from '../../../../utils/pictogramManager';
import getByFilters from '../../../../utils/services/get/getByFilters';
import postApi from '../../../../utils/services/post/postApi';
import deleteResponseApi from '../../../../utils/services/delete/deleteResponseApi';
import Search from '../../../html/button/Search';
import PictoBasicList from '../components/PictoBasicList';
import logoArasaac from '../images/logo-arasaac.png';
import './styles.css';
import Cancel from '../../../html/button/Cancel';

const SEARCH_PH = 'No hay resultados';
const TEMAPLATE_PH = 'No hay pictogramas en la plantilla del alumno';

let timer;
const PictogramTemplateEditor = ({ idProfessional, idStudent, studentName, onCancel }) => {
  const inputRef = useRef();
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingTemplate, setLoadingTemplate] = useState(false);
  const [searchPictos, setSearchPictograms] = useState();
  const [templatePictos, setTemplatePictograms] = useState();

  useEffect(() => {
    getPictosFromStudentTemplate();
  }, [idStudent]);

  function handleKeyPress(event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      getPictosFromSearch();
    }, 3000);
  }

  function handlePictogramClickAdd(picto) {
    postPictoToStudentTemplate(picto);
  }

  function handlePictogramClickRemove(picto) {
    deletePictoFromStudentTemplate(picto);
  }

  async function getPictosFromStudentTemplate() {
    if (!idProfessional || !idStudent) return;
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
    <>
      <div className='pic-editor-input-label'>Plantilla de {studentName || 'alumno'}</div>
      <PictoBasicList className='pic-basic-list pic-basic-list-mb' pictos={templatePictos} onItemClickRemove={handlePictogramClickRemove} placeholderText={TEMAPLATE_PH} loading={loadingTemplate} removeItemVisible />
      <label className='pic-editor-input-label'>Buscar en</label>
      <img src={logoArasaac} width={125} alt='arasaac logo' />
      <div className='pic-editor-input-group'>
        <div className='pic-editor-input-text-search'>
          <input id='zoom' ref={inputRef} type='text' className={'form-control'} placeholder='Escribe para buscar pictogramas' />
        </div>
        <div className='pic-editor-input-btn-search'>
          <Search onClick={handleKeyPress} />
        </div>
      </div>
      <PictoBasicList className={'pic-basic-list'} pictos={searchPictos} onItemClickAdd={handlePictogramClickAdd} placeholderText={SEARCH_PH} loading={loadingSearch} addItemVisible />
      <div className='pic-editor-btn-cancel'>
        <Cancel onClick={onCancel} title='Volver' />
      </div>
    </>
  );
};

export default PictogramTemplateEditor;
