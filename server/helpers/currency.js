const currency = require('currency.js');

const GBP = value => currency((value),
                {   symbol:"£",
                    separator: ",", 
                    decimal: "."   });

module.exports = GBP;