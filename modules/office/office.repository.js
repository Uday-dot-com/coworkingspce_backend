const { Office, Location } = require("../../database/models");
const { Op, literal } = require("sequelize");
const { pagination } = require("../../utilities");
const { CONSTANTS, MESSAGES } = require("../../configs");

exports.getAllOffices = async (params) => {
  const where = {};
  const sortBy = params?.filter?.sortBy || "createdAt";
  const orderBy =
    params?.filter?.orderBy || CONSTANTS.PAGINATION.orderBy.descending;

  where[Op.and] = [];
  const { limit, offset } = pagination.getPagination(params.page, params.items);

  if (params.search) {
    where[Op.and].push({
      [Op.or]: [
        {
          name: {
            [Op.iLike]: `%${params.search}%`,
          },
        },
      ],
    });
  }
  const officeList = await Office.findAndCountAll({
    where,
    include: [
      {
        model: Location,
        as: "locationData",
      },
    ],
    limit,
    offset,
    order: [[sortBy, orderBy]],
  });

  return officeList;
};

exports.findOfficeById = async (id) => {
  return await Office.findOne({
    where: {
      id: id,
    },
  });
};
