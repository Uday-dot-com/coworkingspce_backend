const { MESSAGES } = require('../../../configs');
const { NotFoundException } = require('../../../helpers/errorResponse');
const { logger, sendMail } = require('../../../utilities');
const userRepository = require('../../user/user.repository');
const adminRepository = require('../admin.repository');

module.exports = async (id) => {
    logger.info('Admin-userBlock-service function initiated');

    const userDetails = await userRepository.findUserById(id);

    if (!userDetails || userDetails.isBlocked) throw new NotFoundException(MESSAGES.USER.notFound);

    let params = {
        isBlocked: true,
    };

    await adminRepository.updateUserByAdmin(params, id);

    const responsePayload = {
        id: userDetails.id,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        userName: userDetails.userName,
        email: userDetails.email,
        profilePicUrl: userDetails.profilePicUrl,
        walletAddress: userDetails.walletAddress,
        role: userDetails.role,
        description: userDetails.description,
        socialLinks: userDetails.socialLinks,
        mobileNumber: userDetails.mobileNumber,
        isBlocked: params.isBlocked,
    };
    // send an email to user
    sendMail('blockUser', {
        name: userDetails.firstName + ' ' + userDetails.lastName,
        email: userDetails.email,
    });

    logger.info('Admin-userBlock-service function ended');

    return responsePayload;
};
