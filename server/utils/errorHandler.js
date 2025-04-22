const handleError = (res, error, defaultMessage = 'An error occurred') => {
    const statusCode = error.statusCode || 500; // Default to 500 if no status code is provided
    const message = error.message || defaultMessage;
    return res.status(statusCode).json({
        status: 'error',
        message
    });
};

module.exports = handleError;
