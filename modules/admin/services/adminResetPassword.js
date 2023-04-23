const { MESSAGES } = require('../../../configs');
const adminRepository = require('../admin.repository');
const { NotFoundException, UnauthorizedException } = require('../../../helpers/errorResponse');
const { bcrypt } = require('../../../utilities');

module.exports = async (email, password, newPassword, confirmPassword) => {
    let admin = await adminRepository.findAdminByEmail(email);
    if (!admin) throw new NotFoundException(MESSAGES.ADMIN.invalidCredentials);

    if (admin) {
        if (!admin.isActive) throw new UnauthorizedException(MESSAGES.ADMIN.inactive);
    }

    const validPassword = await bcrypt.verifyPassword(password, admin.password);

    if (!validPassword) throw new UnauthorizedException(MESSAGES.ADMIN.invalidCredentials);

    if (newPassword != confirmPassword) throw new UnauthorizedException(MESSAGES.ADMIN.invalidConfirmPassword);

    const EncPassword = await bcrypt.generatePassword(newPassword);

    const updatePassword = await adminRepository.updateUserByAdmin({ password: EncPassword }, admin.id);

    if (!updatePassword) throw new UnauthorizedException(MESSAGES.ADMIN.passwordChangeFailed);

    return updatePassword;
};
