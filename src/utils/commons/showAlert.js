import React from 'react';
import swal from '@sweetalert/with-react';

export default async function showAlert(title, description, icon) {
  await swal(
    <div>
      <p className='h4 mt-4 mb-3'>{title}</p>
      <span className='text-muted'>{description}</span>
    </div>,
    {
      icon: icon,
      buttons: {
        catch: {
          text: 'Aceptar',
          value: 'reload'
        }
      }
    }
  );
}
