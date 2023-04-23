const { v4: uuid } = require('uuid');
const adminRepository = require('../admin.repository');
const { NotFoundException, UnauthorizedException } = require('../../../helpers/errorResponse');
const { MESSAGES, CONSTANTS } = require('../../../configs');
const { bucketStorageUtils } = require('../../../utilities');

module.exports = async (id, imageFile) => {
    const userProfile = await adminRepository.getUserDetailsById(id);

    if (!userProfile) throw new NotFoundException(MESSAGES.USER.notFound);
    if (userProfile.isBlocked) throw new UnauthorizedException(MESSAGES.USER.blocked);

    const profilePicUrl = `${CONSTANTS.UPLOAD.folders.profile}/${uuid()}${imageFile.ext}`;

    const uploadResponse = await bucketStorageUtils.uploadFile(profilePicUrl, imageFile.data, imageFile.mimeType);

    await adminRepository.updateUserByAdmin({ profilePicUrl: uploadResponse.Key }, id);

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
    return responsePayload;
};
