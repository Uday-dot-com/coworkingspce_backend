const { MESSAGES, CONSTANTS } = require("../../../configs");
const { BadRequestException } = require("../../../helpers/errorResponse");

const { logger } = require("../../../utilities");
require("dotenv").config();

const { Office } = require("../../../database/models");
module.exports = async (body) => {
  console.log(body);
  logger.info("createOffice-service function initiated");
  //const { address, location, city, pincode, office_id } = body;

  const createdOffice = await Office.create(body);

  logger.info("createOffice-service function ended");

  return createdOffice;
};
