const { MESSAGES } = require('../../../configs');
const { NotFoundException, UnauthorizedException } = require('../../../helpers/errorResponse');
const userRepository = require('../user.repository');
const { logger } = require('../../../utilities');

module.exports = async (id) => {
    logger.info('getUserById-service function initiated');

    const userExists = await userRepository.findUserById(id);
    if (!userExists) throw new NotFoundException(MESSAGES.USER.notFound);
    if (userExists.isBlocked) throw new UnauthorizedException(MESSAGES.USER.blocked);

    // TODO: Handle error of duplication in username and email.

    const responsePayload = {
        id: userExists.id,
        firstName: userExists.firstName,
        lastName: userExists.lastName,
        userName: userExists.userName,
        email: userExists.email,
        phone: userExists.phone,
        profilePicUrl: userExists.profilePicUrl,
        walletAddress: userExists.walletAddress,
        role: userExists.role,
        description: userExists.description,
        socialLinks: userExists.socialLinks,
        mobileNumber: userExists.mobileNumber,
        isBlocked: userExists.isBlocked,
        emailVerified: userExists.emailVerified,
        createdAt: userExists.createdAt,
        updatedAt: userExists.updatedAt,
    };

    logger.info('getUserById-service function ended');

    return responsePayload;
};
