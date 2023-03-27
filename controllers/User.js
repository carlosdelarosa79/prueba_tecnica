const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/User");

const usersGet = async (req = request, res = response) => {
  const { to = 5, from = 0 } = req.query;
  const query = { State: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(to)),
  ]);

  res.json({
    total,
    users,
  });
};

const usersPost = async (req, res = response) => {
  const { Identity, Name, Email, Address, City, Phone, Password } = req.body;
  const user = new User({
    Identity,
    Name,
    Email,
    Address,
    City,
    Phone,
    Password,
  });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.Password = bcryptjs.hashSync(Password, salt);

  // Guardar en BD
  await user.save();

  res.json({
    user,
  });
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, Password, Google, Email, ...rest } = req.body;

  if (Password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    rest.Password = bcryptjs.hashSync(Password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json(user);
};

const usersDelete = async (req, res = response) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { State: false });

  res.json(user);
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
};
