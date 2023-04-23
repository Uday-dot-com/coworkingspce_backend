const { MESSAGES } = require('../../../configs');
const adminRepository = require('../admin.repository');
const { PreconditionException, UnauthorizedException } = require('../../../helpers/errorResponse');
const { jwt, bcrypt, logger } = require('../../../utilities');
const speakEasy = require('speakeasy');
const qrCode = require('qrcode');

module.exports = async (email, otpNumber, isScan = true) => {
    logger.info('Admin-verify2fa-service function initiated');

    const admin = await adminRepository.findAdminByEmail(email);
    const verifyResponse = speakEasy.totp.verify({
        secret: admin.secretKey,
        encoding: 'ascii',
        token: otpNumber,
    });
    if (verifyResponse === true) {
        const tokenPayload = {
            id: admin.id,
            role: admin.role,
        };

        const updateUser = await adminRepository.update2fa(admin.id);

        const accessToken = jwt.generateAccessToken(tokenPayload);
        const refreshToken = jwt.generateRefreshToken(tokenPayload);

        const responsePayload = {
            ...tokenPayload,
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            profilePicUrl: admin.profilePicUrl,
            accessToken,
            refreshToken,
        };
        logger.info('Admin-verify2fa-service function ended');

        return responsePayload;
    } else {
        throw new PreconditionException(MESSAGES.ADMIN.invalidOTP);
    }
};
