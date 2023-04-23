const { v4: uuid } = require('uuid');
const { CONSTANTS, MESSAGES } = require('../../../configs');
const { bucketStorageUtils } = require('../../../utilities');
const adminRepository = require('../admin.repository');
const { NotFoundException, UnauthorizedException } = require('./../../../helpers/errorResponse');

module.exports = async (id, imageFile) => {
    const userProfile = await adminRepository.getUserDetailsById(id);

    if (!userProfile) throw new NotFoundException(MESSAGES.USER.notFound);
    if (userProfile.isBlocked) throw new UnauthorizedException(MESSAGES.USER.blocked);

    const bannerPicUrl = `${CONSTANTS.UPLOAD.folders.profile}/${uuid()}${imageFile.ext}`;

    const uploadResponse = await bucketStorageUtils.uploadFile(bannerPicUrl, imageFile.data, imageFile.mimeType);

    await adminRepository.updateUserByAdmin({ bannerImage: uploadResponse.Key }, id);

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
    return responsePayload;
};
