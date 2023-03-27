

const validateInputs = require('./ValidateInputs');
const validateJWT = require('./ValidateJWT');

module.exports = {
    ...validateInputs,
    ...validateJWT,
}