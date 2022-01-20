const { Model } = require('objection');
const { DBErrors } = require('objection-db-errors');

// add error handling to each class so we can catch db client errors 
// i.e. (err instanceof UniqueViolationError); // true
class BaseModel extends DBErrors(Model) {
 
}
 
module.exports = {
  BaseModel
};