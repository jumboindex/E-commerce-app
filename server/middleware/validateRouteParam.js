const ApiError = require("../error/ApiError");

function validateRouteParam(schema) {
    return async (req, res, next) => {
        try {
            console.log(param)
            const validatedRouteParam = await schema.validate(param);
            req[param] = validatedRouteParam;
            next();
        } catch (err) {
            next(ApiError.badRequest(err))
        }
    };
};

module.exports = {
    validateRouteParam
}