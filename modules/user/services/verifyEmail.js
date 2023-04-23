const { jwt, logger } = require('../../../utilities');
const { MESSAGES, CONSTANTS } = require('../../../configs');
const userRepository = require('../user.repository');
const { NotFoundException, UnauthorizedException, BadRequestException } = require('../../../helpers/errorResponse');

module.exports = async (token) => {
    if (!token) throw new UnauthorizedException(MESSAGES.MIDDLEWARE.authorization.missingToken);

    const decoded = await jwt.verifyToken(token, CONSTANTS.JWT.tokenSource.verificationLink);
    const existingUser = await userRepository.findUserById(decoded.id);

    if (!existingUser) throw new NotFoundException(MESSAGES.USER.notFound);

    if (existingUser.isBlocked) throw new UnauthorizedException(MESSAGES.USER.blocked);

    if (existingUser.emailVerified === true) {
        throw new BadRequestException(MESSAGES.USER.emailAlreadyVerified);
    }

    // change emailVerified to true
    if (existingUser.emailVerified === false) {
        let a = await userRepository.updateUser({ emailVerified: true }, existingUser.id);
        // destroy the token
        // await jwt.destroyToken(token, CONSTANTS.JWT.tokenSource.verificationLink);
        return { message: MESSAGES.USER.emailVerified };
    }
};
