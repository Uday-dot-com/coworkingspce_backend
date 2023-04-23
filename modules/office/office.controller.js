const officeService = require("./services");
const { response } = require("../../helpers");
const { MESSAGES } = require("../../configs");
const { logger } = require("../../utilities");
const { PreconditionException } = require("../../helpers/errorResponse");
const path = require("path");

exports.officeCreate = async (req, res, next) => {
  try {
    logger.info("officeCreateController function initiated");

    const body = req.body;

    const responsePayload = await officeService.createOffice(body);

    logger.info("officeCreateController function ended");

    return response.success(
      res,
      responsePayload,
      MESSAGES.LOCATION.locationCreated
    );
  } catch (error) {
    logger.error("Exception Occurred");
    logger.error(error.message);
    logger.error("officeCreateController ended with exception");
    next(error);
  }
};

exports.getAllOffices = async (req, res, next) => {
  try {
    logger.info("getLocationsController function initiated");

    const params = req.query;

    const responsePayload = await officeService.getOffices(params);

    logger.info("getLocationsController function ended");

    return response.success(
      res,
      responsePayload,
      MESSAGES.LOCATION.alllocationsFetched
    );
  } catch (error) {
    logger.error("Exception Occurred");
    logger.error(error.message);
    logger.error("getLocationsController ended with exception");
    next(error);
  }
};

exports.getOffice = async (req, res, next) => {
  try {
    logger.info("getLocation function initiated");
    const { id } = req.params;

    const responsePayload = await officeService.getOfficeById(id);

    return response.success(
      res,
      responsePayload,
      MESSAGES.LOCATION.locationFetched
    );
  } catch (error) {
    logger.error("Exception Occurred");
    logger.error(error.message);
    logger.error("getLocation ended with exception");
    next(error);
  }
};
