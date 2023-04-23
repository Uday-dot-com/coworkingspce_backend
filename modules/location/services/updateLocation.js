const locationRepository = require("../location.repository");
const { MESSAGES } = require("../../../configs");
const { NotFoundException } = require("../../../helpers/errorResponse");

module.exports = async (id, updates) => {
  const locationDetails = await locationRepository.findLocationById(id);
  if (!locationDetails)
    throw new NotFoundException(MESSAGES.LOCATION.locationNotFound);

  await locationRepository.updateLocationById(updates, id);
  return await locationRepository.findLocationById(id);
};
