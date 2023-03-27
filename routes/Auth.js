const { Router } = require('express');
const { check } = require('express-validator');


const { validateInputs } = require('../middlewares/ValidateInputs');


const { login, googleSignin } = require('../controllers/Auth');


const router = Router();

router.post('/login',[
    check('Email', 'El correo es obligatorio').isEmail(),
    check('Password', 'La contraseña es obligatoria').not().isEmpty(),
    validateInputs
],login );

router.post('/google',[
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validateInputs
], googleSignin );



module.exports = router;