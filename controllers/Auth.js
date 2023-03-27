const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/User");

const { generateJWT } = require("../helpers/GenerateJwt");
const { googleVerify } = require("../helpers/GoogleVerify");

const login = async (req, res = response) => {
  const { Email, Password } = req.body;

  console.log("entro al login");

  try {
    // Verificar si el Email existe
    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(400).json({
        msg: "User / Password no son correctos - Email",
      });
    }

    // SI el user está activo
    if (!user.State) {
      return res.status(400).json({
        msg: "User / Password no son correctos - estado: false",
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(Password, user.Password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "User / Password no son correctos - Password",
      });
    }

    // Generar el JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const googleSignin = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { Email, name } = await googleVerify(id_token);

    let user = await User.findOne({ Email });

    if (!user) {
      // Tengo que crearlo
      const data = {
        Name,
        Email,
        Password: ":P",
        Google: true,
      };

      user = new User(data);
      await user.save();
    }

    // Si el user en DB
    if (!user.State) {
      return res.status(401).json({
        msg: "Hable con el administrador, user bloqueado",
      });
    }

    // Generar el JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Token de Google no es válido",
    });
  }
};

module.exports = {
  login,
  googleSignin,
};
