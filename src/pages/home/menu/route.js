import React, { useState } from 'react';
import Home from './home';
import { useHistory } from 'react-router-dom';
import Item from './item';

const Route = ({ title, module, colorStyle, colorClass, description, iconItem }) => {
  const [item, setShowItem] = useState({ home: true, sessions: false, students: false, schedule: false, materials: false, pictograms: false, professional: false });
  let history = useHistory();

  function showItem(itemToShow) {
    setShowItem({ home: false, [itemToShow]: true });
  }

  function redirectSchedule(path) {
    history.push({ pathname: path });
  }

  return (
    <React.Fragment>
      {item.home && <Home title={title} module={module} colorStyle={colorStyle} colorClass={colorClass} returnModule={showItem} description={description} iconItem={iconItem} />}
      {item.sessions && <Item title={title} colorStyle={colorStyle} request='sessions' firstItem='Iniciar una reunión al instante' secondItem='Programar una nueva sesión' redirectFirstItem='meeting-instantly' redirectSecondItem='meeting-for-later' />}
      {item.students && <Item title={title} colorStyle={colorStyle} request='students' firstItem='Registrar un nuevo alumno' secondItem='Listado de alumnos' redirectFirstItem='new-student' redirectSecondItem='students' />}
      {item.schedule && <Item title={title} colorStyle={colorStyle} request='schedule' firstItem='Sesiones pendientes' secondItem='Histórico de sesiones' redirectFirstItem='pending-session' redirectSecondItem='historical-session' />}
      {item.materials && redirectSchedule('share-session')}
      {item.pictograms && redirectSchedule('pictograms')}
      {item.professional && redirectSchedule('user')}
    </React.Fragment>
  );
};

export default Route;
