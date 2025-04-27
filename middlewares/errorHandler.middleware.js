
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    console.error(err.stack);
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        errors: err.errors || [],  // Detailed error messages
        data: err.data || null     // Additional context for the error
    });
};

export default errorHandler;
