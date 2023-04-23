const express = require("express");
const {
  verifySignature,
  validationMiddleware,
  authMiddleware,
  uploadMulterMiddleware,
  roleVerificationMiddleware,
  rateLimiter,
} = require("../../middlewares");
const {
  userSignupSchema,
  userLoginSchema,
} = require("../../modules/user/user.validations");
const userController = require("./user.controller");

const router = express.Router();

router.post(
  "/signup",
  validationMiddleware(userSignupSchema),

  userController.userSignup
);

router.post(
  "/login",
  validationMiddleware(userLoginSchema),

  userController.userLogin
);

module.exports = router;
