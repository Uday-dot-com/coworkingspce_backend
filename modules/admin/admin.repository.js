const { User } = require('../../database/models');
const { CONSTANTS } = require('../../configs');
const { Op } = require('sequelize');

exports.findAdminByEmail = async (email) => {
    return await User.findOne({
        where: {
            email,
            role: CONSTANTS.USER.roles.admin,
        },
    });
};

exports.updateUserByAdmin = async (params, id, t = null) => {
    return await User.update(params, { where: { id }, transaction: t });
};

exports.getUserDetailsById = async (id) => {
    return await User.findOne({
        where: {
            id,
        },
        attributes: {
            exclude: ['password'],
        },
    });
};

exports.checkUserDataAlreadyInUse = async (id, checks) => {
    return await User.findOne({
        where: {
            [Op.and]: [{ id: { [Op.ne]: id } }],
            [Op.or]: checks,
        },
    });
};

exports.findUserExistOrNot = async (walletAddress, userName, phone, email) => {
    return await User.findOne({
        where: {
            [Op.or]: [
                { walletAddress: { [Op.eq]: walletAddress } },
                { userName: { [Op.eq]: userName } },
                { email: { [Op.eq]: email } },
                { phone: { [Op.eq]: phone } },
            ],
        },
    });
};

exports.createUser = async (user, t = null) => {
    return await User.create(user, { transaction: t });
};

exports.update2fa = async (id, t = null) => {
    return await User.update({ isScan: true }, { where: { id }, transaction: t });
};

exports.bulkUpdateUsersByAdmin = async (params, userIds, t = null) => {
    return await User.update(params, {
        where: {
            id: {
                [Op.in]: userIds
            }
        }, transaction: t
    });
};

exports.getUsersBulk = async (ids) => {
    return await User.findAll({
        where: {
            id: {
                [Op.in]: ids
            },
        },
    });
};
