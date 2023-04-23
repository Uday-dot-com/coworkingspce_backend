const { User } = require("../../database/models");
const { Op, literal } = require("sequelize");
const { pagination } = require("../../utilities");
const { CONSTANTS, MESSAGES } = require("../../configs");

exports.findUserById = async (id) => {
  return await User.findOne({
    where: {
      id,
    },
    attributes: {
      include: [
        [
          literal(
            `(Select count (*) from "Assets" where "Assets"."creatorId" = "User".id  and "Assets"."deletedAt" is null)`
          ),
          "totalAssets",
        ],
      ],
    },
  });
};

exports.findUserExistOrNot = async (id, userName, phone, email) => {
  return await User.findOne({
    where: {
      [Op.and]: [{ id: { [Op.ne]: id } }],
      [Op.or]: [
        { userName: { [Op.eq]: userName } },
        { email: { [Op.eq]: email } },
        { phone: { [Op.eq]: phone } },
      ],
    },
  });
};

exports.findUserByWalletAddressOrUserName = async (userDetail) => {
  return await User.findOne({
    where: {
      [Op.or]: [
        { userName: { [Op.eq]: userDetail } },
        { walletAddress: { [Op.eq]: userDetail } },
      ],
    },
    attributes: {
      include: [
        [
          literal(
            `(Select count (*) from "Assets" where "Assets"."creatorId" = "User".id)`
          ),
          "totalAssets",
        ],
      ],
    },
  });
};

exports.findUserByWalletAddress = async (walletAddress) => {
  return await User.findOne({
    where: {
      walletAddress,
    },
  });
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({
    where: {
      email,
    },
  });
};

exports.createUser = async (user, t = null) => {
  return await User.create(user, { transaction: t });
};

exports.updateUser = async (user, id, t = null) => {
  try {
    return await User.update(user, { where: { id }, transaction: t });
  } catch (error) {
    error.message = MESSAGES.USER.isUserExists;
    throw error;
  }
};

exports.getAllUsers = async (params) => {
  const where = {};
  const sortBy = params?.filter?.sortBy || "createdAt";
  const orderBy =
    params?.filter?.orderBy || CONSTANTS.PAGINATION.orderBy.descending;
  let role = CONSTANTS.USER.roles.user;
  if (params && params.filter && params.filter.role) {
    if (params.filter.role != CONSTANTS.USER.roles.admin)
      role = params.filter.role;
  }
  where[Op.and] = [];
  const { limit, offset } = pagination.getPagination(params.page, params.items);
  where[Op.and].push({ role: role });
  if (params.search) {
    where[Op.and].push({
      [Op.or]: [
        {
          firstName: {
            [Op.iLike]: `%${params.search}%`,
          },
        },
        {
          lastName: {
            [Op.iLike]: `%${params.search}%`,
          },
        },
        {
          userName: {
            [Op.iLike]: `%${params.search}%`,
          },
        },
        {
          email: {
            [Op.iLike]: `%${params.search}%`,
          },
        },
        {
          walletAddress: {
            [Op.iLike]: `%${params.search}%`,
          },
        },
      ],
    });
  }

  if (params.filter) {
    if (params.filter.from && params.filter.to) {
      where.createdAt = {
        [Op.between]: [
          new Date(params.filter.from),
          new Date(params.filter.to),
        ],
      };
    } else if (params.filter.from) {
      where.createdAt = {
        [Op.gte]: new Date(params.filter.from),
      };
    } else if (params.filter.to) {
      where.createdAt = {
        [Op.lte]: new Date(params.filter.to),
      };
    }

    if (params.filter.isBlocked === "true") {
      where[Op.and].push({
        isBlocked: true,
      });
    } else if (params.filter.isBlocked === "false") {
      where[Op.and].push({
        isBlocked: false,
      });
    }
  }
  const userList = await User.findAndCountAll({
    attributes: {
      exclude: ["password", "deletedAt", "socialLinks"],
      include: [
        [
          literal(
            `(Select SUM (CAST(value AS float)) from "Transactions" where "Transactions"."userId" = "User".id)`
          ),
          "totalTransactionValue",
        ],
        [
          literal(
            `(Select count (*) from "Assets" where "Assets"."creatorId" = "User".id)`
          ),
          "totalAssets",
        ],
        [
          literal(
            `(Select count (*) from "Collections" where "Collections"."creatorId" = "User".id)`
          ),
          "totalCollections",
        ],
      ],
    },
    where,
    limit,
    offset,
    order: [[sortBy, orderBy]],
  });

  return userList;
};
