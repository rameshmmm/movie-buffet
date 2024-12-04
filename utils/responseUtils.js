const setResponse = (res, status, success, error, message, data) => {
  return res.status(status).send({
    success: success,
    error: error,
    message: message,
    data: data,
  });
};

module.exports = { setResponse };
