const userService = require("./services");
const { response } = require("../../helpers");
const { MESSAGES } = require("../../configs");
const { logger } = require("../../utilities");
const { PreconditionException } = require("../../helpers/errorResponse");
const path = require("path");

exports.userSignup = async (req, res, next) => {
  try {
    logger.info("userSignupController function initiated");

    const body = req.body;

    const responsePayload = await userService.signupUser(body);

    logger.info("userSignupController function ended");

    return response.success(
      res,
      responsePayload,
      MESSAGES.USER.walletConnected
    );
  } catch (error) {
    logger.error("Exception Occurred");
    logger.error(error.message);
    logger.error("userSignupController ended with exception");
    next(error);
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    logger.info("User-login-controller function initiated");

    const { email, password } = req.body;

    const responsePayload = await userService.userLogin(email, password);

    logger.info("User-login-controller function ended");

    return response.success(res, responsePayload, MESSAGES.ADMIN.login);
  } catch (error) {
    logger.error("Exception Occurred");
    logger.error(error.message);
    logger.error("User-login-controller ended with exception");
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    logger.info("getProfileController function initiated");

    const { id } = req.user;

    const responsePayload = await userService.getProfile(id);

    logger.info("getProfileController function ended");

    return response.success(res, responsePayload, MESSAGES.USER.getProfile);
  } catch (error) {
    logger.error("Exception Occurred");
    logger.error(error.message);
    logger.error("getProfileController ended with exception");
    next(error);
  }
};

exports.viewProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const responsePayload = await userService.viewProfile(id);

    return response.success(res, responsePayload, MESSAGES.USER.getProfile);
  } catch (error) {
    logger.error("Exception Occurred");
    logger.error(error.message);
    logger.error("viewProfileController ended with exception");
    next(error);
  }
};

exports.updateProfileImage = async (req, res, next) => {
  try {
    logger.info("updateProfileImageController function initiated");

    if (req.file === undefined || req.file === "undefined") {
      throw new PreconditionException(MESSAGES.USER.invalidProfileImage);
    }

    const fileData = {
      data: req.file,
      mimeType: req.file.mimetype,
      ext: path.extname(req.file.filename),
      fileName: req.file.filename,
    };

    req.file = fileData;

    const {
      user: { id },
      file,
    } = req;

    const responsePayload = await userService.updateProfileImage(id, file);

    logger.info("updateProfileImageController function ended");

    return response.success(
      res,
      responsePayload,
      MESSAGES.USER.profileImageUpload
    );
  } catch (error) {
    logger.error("Exception Occurred");
    logger.error(error.message);
    logger.error("updateProfileImageController ended with exception");
    next(error);
  }
};

exports.removeProfileImage = async (req, res, next) => {
  try {
    logger.info("removeProfileImageController function initiated");

    const { id } = req.user;

    const responsePayload = await userService.removeProfileImage(id);

    logger.info("removeProfileImageController function ended");

    return response.success(
      res,
      responsePayload,
      MESSAGES.USER.removedProfileImage
    );
  } catch (error) {
    logger.error("Exception Occurred");
    logger.error(error.message);
    logger.error("removeProfileImageController ended with exception");
    next(error);
  }
};

exports.updateProfileBannerImage = async (req, res, next) => {
  try {
    logger.info("updateProfileBannerImageController function initiated");

    if (req.file === undefined || req.file === "undefined") {
      throw new PreconditionException(MESSAGES.USER.invalidProfileImage);
    }

    const fileData = {
      data: req.file,
      mimeType: req.file.mimetype,
      ext: path.extname(req.file.filename),
      fileName: req.file.filename,
    };

    req.file = fileData;

    const {
      user: { id },
      file,
    } = req;

    const responsePayload = await userService.updateProfileBannerImage(
      id,
      file
    );

    logger.info("updateProfileBannerImageController function ended");

    return response.success(
      res,
      responsePayload,
      MESSAGES.USER.profileBannerImageUpload
    );
  } catch (error) {
    logger.error("Exception Occurred");
    logger.error(error.message);
    logger.error("updateProfileBannerImageController ended with exception");
    next(error);
  }
};

exports.removeProfileBannerImage = async (req, res, next) => {
  try {
    logger.info("removeProfileBannerImageController function initiated");

    const { id } = req.user;

    const responsePayload = await userService.removeProfileBannerImage(id);

    logger.info("removeProfileBannerImageController function ended");

    return response.success(
      res,
      responsePayload,
      MESSAGES.USER.removedBannerProfileImage
    );
  } catch (error) {
    logger.error("Exception Occurred");
    logger.error(error.message);
    logger.error("removeProfileBannerImageController ended with exception");
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    logger.info("getUserByIdController function initiated");

    const { userId } = req.params;

    const responsePayload = await userService.getUserById(userId);

    logger.info("getUserByIdController function ended");

    return response.success(res, responsePayload, MESSAGES.USER.getProfile);
  } catch (error) {
    logger.error("Exception Occurred");
    logger.error(error.message);
    logger.error("getUserByIdController ended with exception");
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    logger.info("getUsersController function initiated");

    const params = req.query;

    const responsePayload = await userService.getUsers(params);

    logger.info("getUsersController function ended");

    return response.success(res, responsePayload, MESSAGES.USER.usersFetched);
  } catch (error) {
    logger.error("Exception Occurred");
    logger.error(error.message);
    logger.error("getUsersController ended with exception");
    next(error);
  }
};

exports.userRefreshToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const responsePayload = await userService.userRefreshToken(authorization);

    return response.success(res, responsePayload, MESSAGES.USER.refreshToken);
  } catch (error) {
    logger.error("Exception Occurred");
    logger.error(error.message);
    logger.error("userRefreshToken ended with exception");
    next(error);
  }
};
exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.body;

    const responsePayload = await userService.verifyEmail(token);

    return response.success(res, responsePayload, MESSAGES.USER.emailVerified);
  } catch (error) {
    logger.error("Exception Occurred");
    logger.error(error.message);
    logger.error("verifyEmail ended with exception");
    next(error);
  }
};

exports.resendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const responsePayload = await userService.resendVerificationEmail(email);

    return response.success(res, responsePayload, MESSAGES.USER.emailSent);
  } catch (error) {
    logger.error("Exception Occurred");
    logger.error(error.message);
    logger.error("resendVerificationEmail ended with exception");
    next(error);
  }
};
