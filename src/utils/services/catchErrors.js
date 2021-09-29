import showAlert from '../commons/showAlert';
import { HttpStatusErrorCode } from '../enums/httpConstants';

export default async function catchErrors(error) {
  if ((error.response.status === HttpStatusErrorCode.BadRequest || error.response.status) === HttpStatusErrorCode.NotFound) return true;

  if (error.response.status === HttpStatusErrorCode.Unauthorized || error.response.status === HttpStatusErrorCode.UnprocessableEntity) {
    await showAlert('Error en el mensaje', error.response.data.message, 'error');
    document.location.href = window.location.origin + '#/home';
  }

  if (error.response.status >= HttpStatusErrorCode.InternalServerError) {
    await showAlert('Error en el servidor', 'Por favor reintente mas tarde', 'error');
    document.location.href = window.location.origin + '#/home';
  }
}
