const userRepository = require('../user.repository');
const { logger } = require('../../../utilities');

module.exports = async (params) => {
    logger.info('getUsers-service function initiated');

    const { page, items } = params;
    const search = params.search || null;
    const filter = params.filter ? JSON.parse(params.filter) : null;

    const queryParams = {
        page,
        items,
        filter,
        search,
    };

    const users = await userRepository.getAllUsers(queryParams);
    const responsePayload = { pageMeta: { totalItems: users.count, page: +page, items: +items }, userList: users.rows };

    logger.info('getUsers-service function ended');

    return responsePayload;
};
