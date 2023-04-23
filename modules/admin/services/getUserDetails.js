const { MESSAGES } = require('../../../configs');
const { NotFoundException } = require('../../../helpers/errorResponse');
const adminRepository = require('../admin.repository');

module.exports = async (id) => {
    const userDetails = await adminRepository.getUserDetailsById(id);
    if (!userDetails) throw new NotFoundException(MESSAGES.USER.notFound);
    return userDetails;
};
