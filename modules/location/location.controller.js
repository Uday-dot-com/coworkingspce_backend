const locationService = require("./services");
const { response } = require("../../helpers");
const { MESSAGES } = require("../../configs");
const { logger } = require("../../utilities");
const { PreconditionException } = require("../../helpers/errorResponse");
const path = require("path");

exports.locationCreate = async (req, res, next) => {
  try {
    logger.info("locationCreateController function initiated");

    const body = req.body;

    const responsePayload = await locationService.createLocation(body);

    logger.info("locationCreateController function ended");

    return response.success(
      res,
      responsePayload,
      MESSAGES.LOCATION.locationCreated
    );
  } catch (error) {
    logger.error("Exception Occurred");
    logger.error(error.message);
    logger.error("locationCreateController ended with exception");
    next(error);
  }
};

exports.getAllLocations = async (req, res, next) => {
  try {
    logger.info("getLocationsController function initiated");

    const params = req.query;

    const responsePayload = await locationService.getLocations(params);

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

exports.getLocation = async (req, res, next) => {
  try {
    logger.info("getLocation function initiated");
    const { id } = req.params;

    const responsePayload = await locationService.getLocationById(id);

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

exports.deleteLocation = async (req, res, next) => {
  try {
    logger.info("deleteLocation function initiated");
    const { id } = req.params;

    const responsePayload = await locationService.removeLocationById(id);

    return response.success(
      res,
      responsePayload,
      MESSAGES.LOCATION.locationRemoved
    );
  } catch (error) {
    logger.error("Exception Occurred");
    logger.error(error.message);
    logger.error("deleteLocation ended with exception");
    next(error);
  }
};

exports.updateLocationById = async (req, res, next) => {
  try {
    const responsePayload = await locationService.updateLocation(
      req.params.id,
      req.body
    );
    return response.success(
      res,
      responsePayload,
      MESSAGES.LOCATION.locationUpdated
    );
  } catch (error) {
    logger.error("Exception Occurred");
    logger.error(error.message);
    logger.error("updateLocationById controller ended with exception");
    next(error);
  }
};
