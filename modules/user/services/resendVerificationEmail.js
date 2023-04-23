const userRepository = require('../user.repository');
const { sendMail, jwt } = require('../../../utilities');
const { NotFoundException, UnauthorizedException, BadRequestException } = require('../../../helpers/errorResponse');
const { MESSAGES, CONSTANTS } = require('../../../configs');

module.exports = async (email) => {
    // check the email exist or not
    const user = await userRepository.findUserByEmail(email);
    if (!user) throw new NotFoundException(MESSAGES.USER.notFound);
    if (user.isBlocked) throw new UnauthorizedException(MESSAGES.USER.blocked);
    if (user.emailVerified === true) throw new BadRequestException(MESSAGES.USER.emailAlreadyVerified);

    // send verification email
    const token = await jwt.generateToken(
        { id: user.id, email: user.email },
        CONSTANTS.JWT.tokenSource.verificationLink,
        CONSTANTS.JWT.verificationLink.expiresIn
    );
    let url = `${CONSTANTS.APP.frontendUrl}/base/verify-email?token=${token}`;

    sendMail('emailVerification', {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: url,
    });
    return { message: MESSAGES.USER.emailVerificationLinkSent };
};
