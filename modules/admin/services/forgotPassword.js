const adminRepository = require('../admin.repository');
const { NotFoundException, UnauthorizedException, BadRequestException } = require('../../../helpers/errorResponse');
const { MESSAGES, CONSTANTS } = require('../../../configs');
const { logger, sendMail, jwt } = require('../../../utilities');
const { bcrypt } = require('../../../utilities');

module.exports.forgotPassword = async (email) => {
    logger.info('Admin-forgotPassword-service function initiated');

    const admin = await adminRepository.findAdminByEmail(email);

    // if (!admin) throw new NotFoundException(MESSAGES.ADMIN.emailNotFound);

    if (!admin) return { message: MESSAGES.ADMIN.forgotPassword };

    if (admin) {
        // Send email to admin
        const sToken = await jwt.generateToken(
            { id: admin.id, email: email },
            CONSTANTS.JWT.tokenSource.forgotPassword,
            CONSTANTS.JWT.verificationLink.expiresIn
        );
        let url = `${CONSTANTS.APP.adminUrl}/auth/change-password?token=${sToken}`;
        sendMail('forgotPassword', {
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: email,
            token: url,
        });
        return { message: MESSAGES.ADMIN.forgotPassword };
    }
};

module.exports.changePassword = async (token, password, confirmPassword) => {
    logger.info('Admin-changePassword-service function initiated');
    if (!token) throw new UnauthorizedException(MESSAGES.MIDDLEWARE.authorization.missingToken);

    const decoded = await jwt.verifyToken(token, CONSTANTS.JWT.tokenSource.forgotPassword);
    const existingUser = await adminRepository.findAdminByEmail(decoded.email);
    if (!existingUser) throw new NotFoundException(MESSAGES.ADMIN.invalidCredentials);

    if (password !== confirmPassword) throw new BadRequestException(MESSAGES.USER.passwordNotMatch);

    const EncPassword = await bcrypt.generatePassword(password);
    const updatePassword = await adminRepository.updateUserByAdmin({ password: EncPassword }, decoded.id);
    if (!updatePassword) throw new UnauthorizedException(MESSAGES.ADMIN.passwordChangeFailed);

    return updatePassword;
};
