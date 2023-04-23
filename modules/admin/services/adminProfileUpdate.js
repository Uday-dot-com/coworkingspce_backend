const { MESSAGES } = require('../../../configs');
const { NotFoundException, BadRequestException } = require('../../../helpers/errorResponse');
const adminRepository = require('../admin.repository');
const { Op } = require('sequelize');

module.exports = async (id, updates) => {
    const adminDetails = await adminRepository.getUserDetailsById(id);
    if (!adminDetails) throw new NotFoundException(MESSAGES.USER.notFound);

    if (updates?.is2Fa && updates?.is2Fa === true) {
        updates.secretKey = null;
        updates.isScan = false;
    }
    
    //Handle error of duplication in username and email.
    let checks = [];

    if (updates?.email) {
        checks.push({ email: { [Op.eq]: updates.email } });
    }
    if (updates?.phone) {
        checks.push({ phone: { [Op.eq]: updates.phone } });
    }
    let userAlreadyExists = await adminRepository.checkUserDataAlreadyInUse(id, checks);
    if (userAlreadyExists) {
        if (userAlreadyExists.email === updates.email) {
            throw new BadRequestException(MESSAGES.USER.isUserEmailExists);
        } else if (userAlreadyExists.phone === updates.phone) {
            throw new BadRequestException(MESSAGES.USER.isUserPhoneExists);
        }
    }
    await adminRepository.updateUserByAdmin(updates, id);
    return await adminRepository.getUserDetailsById(id);
};
