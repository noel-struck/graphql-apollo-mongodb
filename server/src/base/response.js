module.exports = class Response {
  constructor(data, statusCode, success, message) {
    this.data = data;
    this.statusCode = statusCode;
    this.success = success;
    this.message = message;
  }
};
