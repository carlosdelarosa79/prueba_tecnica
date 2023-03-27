const { Router } = require("express");
const { check } = require("express-validator");

const {
  validateInputs,
  validateJWT,
} = require("../middlewares");

const {
  isValidRole,
    existEmail,
    existById,
} = require("../helpers/DbValidators");

const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
} = require("../controllers/User");

const router = Router();

router.get("/", usersGet);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existById),
    validateInputs,
  ],
  usersPut
);

router.post(
  "/",
  [
    validateInputs,
  ],
  usersPost
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existById),
    validateInputs,
  ],
  usersDelete
);

module.exports = router;
