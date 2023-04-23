const locationRepository = require("../location.repository");
const { logger } = require("../../../utilities");
const { NotFoundException } = require("../../../helpers/errorResponse");
const { MESSAGES } = require("../../../configs");

module.exports = async (id) => {
  const locationExists = await locationRepository.findLocationById(id);
  if (!locationExists)
    throw new NotFoundException(MESSAGES.LOCATION.locationNotFound);
  return await locationRepository.removeLocationById(id);
};
