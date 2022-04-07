// Http Status Codes

const HttpStatusCode = {
  OK                    : 200,
  CREATED               : 201,
  ACCEPTED              : 202,
  NOT_MODIFIED          : 304,
  BAD_REQUEST           : 400,
  UNAUTHORIZED          : 401,
  FORBIDDEN             : 403,
  NOT_FOUND             : 404,
  METHOD_NOT_ALLOWED    : 405,
  NOT_ACCEPTABLE        : 406,
  REQUEST_TIMEOUT       : 408,
  CONFLICT              : 409,
  TOO_MANY_REQUESTS     : 429,
  INTERNAL_SERVER_ERROR : 500
};

const HttpStatusMessage = {
  OK                    : "OK",
  CREATED               : "CREATED",
  ACCEPTED              : "ACCEPTED",
  NOT_MODIFIED          : "NOT_MODIFIED",
  BAD_REQUEST           : "BAD_REQUEST",
  UNAUTHORIZED          : "UNAUTHORIZED",
  FORBIDDEN             : "FORBIDDEN",
  NOT_FOUND             : "NOT_FOUND",
  CONFLICT              : "CONFLICT",
  METHOD_NOT_ALLOWED    : "METHOD_NOT_ALLOWED",
  NOT_ACCEPTABLE        : "NOT_ACCEPTABLE",
  REQUEST_TIMEOUT       : "REQUEST_TIMEOUT",
  TOO_MANY_REQUESTS     : "TOO_MANY_REQUESTS",
  INTERNAL_SERVER_ERROR : "INTERNAL_SERVER_ERROR"
};

const ResponseMessage = {
  ALREADY_EXISTS: "ALREADY_EXISTS",
  EMPTY_EMAIL_PASSWORD: "EMAIL_OR_PASSWORD_EMPTY",
  EMAIL_NOT_EXISTS: "EMAIL_NOT_EXISTS",
  WRONG_PASSWORD: "WRONG_PASSWORD",
  EMAIL_EXISTS: "EMAIL_EXISTS",
  DATABASE_ERROR: "DATABASE_ERROR",
  PASSWORD_ENCRYPTION_ERROR: "PASSWORD_ENCRYPTION_ERROR",
  USER_CREATED: "USER_CREATED",
  CREATED: "CREATED",
  LOGIN_SUCCESSFUL: "LOGIN_SUCCESSFUL",
  TOKEN_GENERATION_ERROR: "TOKEN_GENERATION_ERROR",
  NOT_EXISTS: "NOT_EXISTS",
  MODULE_NOT_EXISTS: "MODULE_NOT_EXISTS"
};

module.exports = {
  HttpStatusCode,
  HttpStatusMessage,
  ResponseMessage
};