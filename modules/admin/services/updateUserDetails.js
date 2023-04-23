const { MESSAGES } = require('../../../configs');
const { NotFoundException, BadRequestException } = require('../../../helpers/errorResponse');
const adminRepository = require('../admin.repository');
const { Op } = require('sequelize');

module.exports = async (id, updates) => {
    const userDetails = await adminRepository.getUserDetailsById(id);
    if (!userDetails) throw new NotFoundException(MESSAGES.USER.notFound);

    //Handle error of duplication in username and email.
    let checks = [];

    if (updates?.userName) {
        checks.push({ userName: { [Op.eq]: updates.userName } });
    }
    if (updates?.email) {
        checks.push({ email: { [Op.eq]: updates.email } });
    }
    if (updates?.phone) {
        checks.push({ phone: { [Op.eq]: updates.phone } });
    }
    let userAlreadyExists = await adminRepository.checkUserDataAlreadyInUse(id, checks);
    if (userAlreadyExists) {
        if (userAlreadyExists.userName === updates.userName) {
            throw new BadRequestException(MESSAGES.USER.isUserNameExists);
        } else if (userAlreadyExists.email === updates.email) {
            throw new BadRequestException(MESSAGES.USER.isUserEmailExists);
        } else if (userAlreadyExists.phone === updates.phone) {
            throw new BadRequestException(MESSAGES.USER.isUserPhoneExists);
        }
    }
    await adminRepository.updateUserByAdmin(updates, id);
    return await adminRepository.getUserDetailsById(id);
};
