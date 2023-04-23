const locationRepository = require("../location.repository");
const { logger } = require("../../../utilities");

module.exports = async (id) => {
  const locationById = await locationRepository.findLocationById(id);

  return locationById;
};
