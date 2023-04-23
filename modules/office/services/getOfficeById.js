const officeRepository = require("../office.repository");
const { logger } = require("../../../utilities");

module.exports = async (id) => {
  const officeById = await officeRepository.findOfficeById(id);

  return officeById;
};
