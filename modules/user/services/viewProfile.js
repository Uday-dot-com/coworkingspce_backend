const { MESSAGES } = require('../../../configs');
const userRepository = require('../user.repository');
const { NotFoundException, UnauthorizedException } = require('../../../helpers/errorResponse');

module.exports = async (id) => {
    const userProfile = await userRepository.findUserByWalletAddressOrUserName(id);

    if (!userProfile) throw new NotFoundException(MESSAGES.USER.notFound);

    if (userProfile) {
        if (userProfile.isBlocked) throw new UnauthorizedException(MESSAGES.USER.blocked);
    }

    const responsePayload = {
        id: userProfile.id,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        userName: userProfile.userName,
        profilePicUrl: userProfile.profilePicUrl,
        description: userProfile.description,
        socialLinks: userProfile.socialLinks,
        bannerImage: userProfile.bannerImage,
        createdNFTCount: userProfile.dataValues.totalAssets,
        role: userProfile.role,
    };

    return responsePayload;
};
