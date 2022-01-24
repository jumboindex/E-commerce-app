const ApiError = require("./ApiError");
const { 
    wrapError, 
    DBError, 
    UniqueViolationError, 
    NotNullViolationError 
} = require('db-errors');


function apiErrorHandler(err, req, res, next) {

    //todo set up logging as console.error is not async
    console.error(err);
    // function  takes any error and return DBError subclass instance if thrown by db. Otherwise inpput error returned. 
    err = wrapError(err);

    //todo change error messages for prod so no SQL / app info leaks
    if (err instanceof ApiError) return res.status(err.code).json(err.message);
   

    if (err instanceof UniqueViolationError) {
        return res.status(409).json( 
            `Unique constraint ${err.constraint} failed for table ${err.table} and columns ${err.columns}`);
    } else if (err instanceof NotNullViolationError) {
        return res.status(400).json(
            `Not null constraint failed for table ${err.table} and column ${err.column}`);
    } else if (err instanceof DBError) {
        return res.status(500).json(`Some unknown DB error occured ${err.message} invalid syntax`);
    } else {
        return res.status(500).json('Something went wrong!');
    } 

};

module.exports = apiErrorHandler;