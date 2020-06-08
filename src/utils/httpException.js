module.exports = {
  set: (code, message) => {
    return {
      statusCode: code,
      isSuccess: false,
      message: message,
    }
  },
}
