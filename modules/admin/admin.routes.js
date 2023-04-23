const { CONSTANTS } = require("../../configs");
const express = require("express");
const {
  validationMiddleware,
  authMiddleware,
  uploadMulterMiddleware,
} = require("../../middlewares");
const { adminLoginSchema } = require("./admin.validations");
const adminController = require("./admin.controller");
const { admin } = CONSTANTS.USER.roles;

const router = express.Router();

router.post(
  "/login",
  validationMiddleware(adminLoginSchema),
  adminController.adminLogin
);

module.exports = router;
