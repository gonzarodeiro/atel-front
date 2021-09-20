import React from 'react';
import swal from '@sweetalert/with-react';

export default function logout() {
  swal(
    <div>
      <p className='h4 mt-4 mb-3'>¿Querés salir de la sesión?</p>
    </div>,
    {
      icon: 'error',
      buttons: {
        cancel: 'Cancelar',
        catch: {
          text: 'Salir',
          value: 'logout'
        }
      }
    }
  ).then((value) => {
    if (value === 'logout') {
      sessionStorage.clear();
      document.location.href = window.location.origin + '/atel-front/#/login';
    }
  });
}
