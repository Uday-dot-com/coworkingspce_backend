const { v4: uuid } = require('uuid');
const userRepository = require('../user.repository');
const { NotFoundException, UnauthorizedException } = require('../../../helpers/errorResponse');
const { MESSAGES, CONSTANTS } = require('../../../configs');
const { bucketStorageUtils, logger } = require('../../../utilities');

module.exports = async (id, imageFile) => {
    logger.info('updateProfileImage-service function initiated');

    const userProfile = await userRepository.findUserById(id);

    if (!userProfile) throw new NotFoundException(MESSAGES.USER.notFound);
    if (userProfile.isBlocked) throw new UnauthorizedException(MESSAGES.USER.blocked);

    const profilePicUrl = `${CONSTANTS.UPLOAD.folders.profile}/${uuid()}${imageFile.ext}`;

    const uploadResponse = await bucketStorageUtils.uploadFile(profilePicUrl, imageFile.data, imageFile.mimeType);

    await userRepository.updateUser({ profilePicUrl: uploadResponse.Key }, id);

    // Deleting old profile image from storage
    if (userProfile.profilePicUrl) {
        await bucketStorageUtils.deleteFile(userProfile.profilePicUrl);
    }

    const responsePayload = {
        id: userProfile.id,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        userName: userProfile.userName,
        email: userProfile.email,
        phone: userProfile.phone,
        profilePicUrl: uploadResponse.Key,
        walletAddress: userProfile.walletAddress,
        role: userProfile.role,
    };

    logger.info('updateProfileImage-service function ended');

    return responsePayload;
};
