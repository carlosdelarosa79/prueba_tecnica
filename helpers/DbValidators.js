const Role = require('../models/Role');
const User = require('../models/User');

const isValidRole = async(rol = '') => {

    const existRol = await Role.findOne({ rol });
    if ( !existRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const existEmail = async( email = '' ) => {
    // Verificar si el correo existe
    const existEmail = await User.findOne({ email });
    if ( existEmail ) {
        throw new Error(`El correo: ${ email }, ya está registrado`);
    }
}

const existById = async( id ) => {
    // Verificar si el correo existe
    const existById = await User.findById(id);
    if ( !existById ) {
        throw new Error(`El id no existe ${ id }`);
    }
}



module.exports = {
    isValidRole,
    existEmail,
    existById,
}

