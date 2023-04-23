const { MESSAGES } = require('../../../configs');
const adminRepository = require('../admin.repository');
const { NotFoundException, UnauthorizedException } = require('../../../helpers/errorResponse');
const { bcrypt } = require('../../../utilities');

module.exports = async (email, password) => {
    const admin = await adminRepository.findAdminByEmail(email);
    if (!admin) throw new NotFoundException(MESSAGES.ADMIN.invalidCredentials);

    if (admin) {
        if (!admin.isActive) throw new UnauthorizedException(MESSAGES.ADMIN.inactive);
    }

    const validPassword = await bcrypt.verifyPassword(password, admin.password);

    if (!validPassword) throw new UnauthorizedException(MESSAGES.ADMIN.invalidCredentials);

    const responsePayload = {
        valid: true,
    };

    return responsePayload;
};
