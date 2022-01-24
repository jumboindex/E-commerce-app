class ApiError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    static badRequest(msg) {
        return new ApiError(400, msg);
    }
    
    static internalServerError(msg) {
        return new ApiError(500, msg);
    }

    static uniqueViolationError(msg) {
        return new ApiError(409, msg);
    }

    static notFound(msg) {
        return new ApiError(404, msg);
    }

};

module.exports = ApiError;