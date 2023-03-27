
const { Schema, model } = require('mongoose');
// defino la tabla con tipo de dato y campos obligatorios
const UserSchema = Schema({
    Identity: {
        type: String,
        required: [true, 'El documento es obligatorio']
    },
    Name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    Email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    Address: {
        type: String,
        required: [true, 'La dirección es obligatoria']
    },
    City: {
        type: String,
        required: [true, 'La ciudad es obligatoria']
    },
    Phone: {
        type: String,
        required: [true, 'El teléfono es obligatorio']
    },
    Password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    Rol: {
        type: String,
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    State: {
        type: Boolean,
        default: true
    },
    Google: {
        type: Boolean,
        default: false
    },
});


// extraigo la inf que no voy a enviar al front
UserSchema.methods.toJSON = function() {
    const { __v, Password, _id, ...user  } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model( 'User', UserSchema );
