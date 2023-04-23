const locationRepository = require("../location.repository");
const { logger } = require("../../../utilities");

module.exports = async (params) => {
  logger.info("getLocations-service function initiated");

  const { page, items } = params;
  const search = params.search || null;
  const filter = params.filter ? JSON.parse(params.filter) : null;

  const queryParams = {
    page,
    items,
    filter,
    search,
  };

  const locations = await locationRepository.getAllLocations(queryParams);
  const responsePayload = {
    pageMeta: { totalItems: locations.count, page: +page, items: +items },
    locationsList: locations.rows,
  };

  logger.info("getLocations-service function ended");

  return responsePayload;
};
