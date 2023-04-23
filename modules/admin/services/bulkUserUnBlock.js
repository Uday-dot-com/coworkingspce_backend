
const adminRepository = require('../admin.repository');
const { logger, sendMail } = require('../../../utilities');

module.exports = async (userIds) => {
    let params = {
        isBlocked: false,
    };

    await adminRepository.bulkUpdateUsersByAdmin(params, userIds);

    const users = await adminRepository.getUsersBulk(userIds);

    for (const userDetails of users) {
        // send an email to user
        sendMail('unblockUser', {
            name: userDetails.firstName + ' ' + userDetails.lastName,
            email: userDetails.email,
        }).then().catch(e => logger.error(e));
    }

    return true;
};
