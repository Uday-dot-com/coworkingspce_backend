const userRepository = require('../user.repository');
const { NotFoundException, UnauthorizedException } = require('../../../helpers/errorResponse');
const { MESSAGES } = require('../../../configs');
const { bucketStorageUtils, logger } = require('../../../utilities');

module.exports = async (id) => {
    logger.info('removeProfileImage-service function initiated');

    const userProfile = await userRepository.findUserById(id);

    if (!userProfile) throw new NotFoundException(MESSAGES.USER.notFound);
    if (userProfile.isBlocked) throw new UnauthorizedException(MESSAGES.USER.blocked);

    // Deleting profile image from storage
    if (userProfile.profilePicUrl) {
        await bucketStorageUtils.deleteFile(userProfile.profilePicUrl);
    }

    await userRepository.updateUser({ profilePicUrl: null }, id);

    const responsePayload = {
        id: userProfile.id,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        userName: userProfile.userName,
        email: userProfile.email,
        profilePicUrl: null,
        walletAddress: userProfile.walletAddress,
        role: userProfile.role,
    };

    logger.info('removeProfileImage-service function ended');

    return responsePayload;
};
