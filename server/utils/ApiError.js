class ApiError extends Error {
    constructor(statuscode, message, isOperational = true) {
        super(message);
        this.statuscode = statuscode;
        this.isOperational = isOperational; // Distinguish system errors and professional errors
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApiError;