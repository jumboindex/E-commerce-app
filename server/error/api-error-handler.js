const ApiError = require("./ApiError");

function apiErrorHandler(err, req, res, next) {

    //todo set up logging as console.error is not async
    console.error(err);

    if (err instanceof ApiError) {
        res.status(err.code).json(err.message);
        return;
    };

    res.status(500).json('Something went wrong!');
};

module.exports = apiErrorHandler;