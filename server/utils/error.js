exports.errorResponse = (message = 'An error occurred', statusCode = 500, data = []) => {
    const err = new Error(message)
    err.statusCode = statusCode;
    err.data = data;
    throw err
}