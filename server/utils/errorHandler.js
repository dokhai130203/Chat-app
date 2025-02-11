const ApiError = require('./ApiError');
const logger = require('./logger');

const errorHandler = (error, request, response, next) => {
    if(error instanceof ApiError) {
        return response.status(error.statuscode).json({
            success: true, 
            message: error.message
        });
    }
    logger.error(error.stack);
    response.status(500).json({
        success: false,
        message: 'Something went wrong'
    });
};

module.exports = errorHandler;