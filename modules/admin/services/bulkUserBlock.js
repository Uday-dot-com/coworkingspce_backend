const { logger, sendMail } = require('../../../utilities');
const adminRepository = require('../admin.repository');

module.exports = async (userIds) => {

    let params = {
        isBlocked: true,
    };

    await adminRepository.bulkUpdateUsersByAdmin(params, userIds);

    const users = await adminRepository.getUsersBulk(userIds);

    for (const userDetails of users) {
        // send an email to user
        sendMail('blockUser', {
            name: userDetails.firstName + ' ' + userDetails.lastName,
            email: userDetails.email,
        }).then().catch(e => logger.error(e));
    }

    return true;
};
