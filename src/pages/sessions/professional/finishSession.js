import React from 'react';
import swal from '@sweetalert/with-react';

export default function finishSession(redirectEnd) {
  swal(
    <div>
      <p className='h4 mt-4 mb-3'>¿Querés finalizar la sesión?</p>
    </div>,
    {
      icon: 'warning',
      buttons: {
        cancel: 'No',
        catch: {
          text: 'Si',
          value: 'ok'
        }
      }
    }
  ).then((value) => {
    if (value === 'ok') redirectEnd();
  });
}
