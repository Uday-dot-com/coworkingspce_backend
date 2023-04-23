const { MESSAGES, CONSTANTS } = require("../../../configs");
const { BadRequestException } = require("../../../helpers/errorResponse");

const { logger } = require("../../../utilities");
require("dotenv").config();

const { Location } = require("../../../database/models");
module.exports = async (body) => {
  logger.info("createLocation-service function initiated");
  const { address, location, city, pincode, office_id } = body;

  const createdLocation = await Location.create({
    address,
    location,
    city,
    pincode,
    office_id,
  });

  logger.info("createLocation-service function ended");

  return createdLocation;
};
