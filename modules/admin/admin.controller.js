/* eslint-disable */
const adminService = require("./services");
const { response } = require("../../helpers");
const { MESSAGES } = require("../../configs");
const { logger } = require("../../utilities");
const { PreconditionException } = require("./../../helpers/errorResponse");
const path = require("path");

exports.adminLogin = async (req, res, next) => {
  try {
    logger.info("Admin-login-controller function initiated");

    const { email, password } = req.body;

    const responsePayload = await adminService.adminLogin(email, password);

    logger.info("Admin-login-controller function ended");

    return response.success(res, responsePayload, MESSAGES.ADMIN.login);
  } catch (error) {
    logger.error("Exception Occurred");
    logger.error(error.message);
    logger.error("Admin-login-controller ended with exception");
    next(error);
  }
};
