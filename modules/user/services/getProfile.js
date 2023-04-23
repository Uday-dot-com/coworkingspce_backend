const { MESSAGES } = require('../../../configs');
const userRepository = require('../user.repository');
const { NotFoundException, UnauthorizedException } = require('../../../helpers/errorResponse');
const { logger } = require('../../../utilities');

module.exports = async (id) => {
    logger.info('getProfile-service function initiated');

    const userProfile = await userRepository.findUserById(id);

    if (!userProfile) throw new NotFoundException(MESSAGES.USER.notFound);

    if (userProfile) {
        if (userProfile.isBlocked) throw new UnauthorizedException(MESSAGES.USER.blocked);
    }

    const responsePayload = {
        id: userProfile.id,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        userName: userProfile.userName,
        email: userProfile.email,
        phone: userProfile.phone,
        profilePicUrl: userProfile.profilePicUrl,
        walletAddress: userProfile.walletAddress,
        role: userProfile.role,
        emailVerified: userProfile.emailVerified,
        description: userProfile.description,
        socialLinks: userProfile.socialLinks,
        bannerImage: userProfile.bannerImage,
        createdNFTCount: userProfile.dataValues.totalAssets,
    };

    logger.info('getProfile-service function ended');

    return responsePayload;
};
