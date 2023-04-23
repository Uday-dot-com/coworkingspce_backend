const { v4: uuid } = require('uuid');
const userRepository = require('../user.repository');
const { NotFoundException, UnauthorizedException } = require('../../../helpers/errorResponse');
const { MESSAGES, CONSTANTS } = require('../../../configs');
const { bucketStorageUtils, logger } = require('../../../utilities');

module.exports = async (id, imageFile) => {
    logger.info('updateProfileBannerImages-service function initiated');

    const userProfile = await userRepository.findUserById(id);

    if (!userProfile) throw new NotFoundException(MESSAGES.USER.notFound);
    if (userProfile.isBlocked) throw new UnauthorizedException(MESSAGES.USER.blocked);

    const profileBannerPicUrl = `${CONSTANTS.UPLOAD.folders.profile}/${uuid()}${imageFile.ext}`;

    const uploadResponse = await bucketStorageUtils.uploadFile(profileBannerPicUrl, imageFile.data, imageFile.mimeType);

    await userRepository.updateUser({ bannerImage: uploadResponse.Key }, id);

    // Deleting old profile image from storage
    if (userProfile.bannerImage) {
        await bucketStorageUtils.deleteFile(userProfile.bannerImage);
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
        bannerImage: uploadResponse.Key,
    };

    logger.info('updateProfileBannerImages-service function ended');

    return responsePayload;
};
