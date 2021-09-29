const HttpStatusCode = {
  Success: 200,
  Created: 201,
  Ok: 'OK'
};

const HttpStatusErrorCode = {
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  ImATeaPot: 418,
  UnprocessableEntity: 422,
  InternalServerError: 500,
  ServiceUnavailable: 503
};

export { HttpStatusCode, HttpStatusErrorCode };
