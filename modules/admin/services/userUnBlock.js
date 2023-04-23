const { MESSAGES } = require('../../../configs');
const { NotFoundException } = require('../../../helpers/errorResponse');
const adminRepository = require('../admin.repository');
const userRepository = require('../../user/user.repository');
const { logger, sendMail } = require('../../../utilities');

module.exports = async (id) => {
    logger.info('Admin-userUnBlock-service function initiated');

    const userDetails = await userRepository.findUserById(id);

    if (!userDetails || !userDetails.isBlocked) throw new NotFoundException(MESSAGES.USER.notFound);

    let params = {
        isBlocked: false,
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
    sendMail('unblockUser', {
        name: userDetails.firstName + ' ' + userDetails.lastName,
        email: userDetails.email,
    });

    logger.info('Admin-userUnBlock-service function ended');
    return responsePayload;
};
