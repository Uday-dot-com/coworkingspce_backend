const { Location } = require("../../database/models");
const { Op, literal } = require("sequelize");
const { pagination } = require("../../utilities");
const { CONSTANTS, MESSAGES } = require("../../configs");

exports.getAllLocations = async (params) => {
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
          address: {
            [Op.iLike]: `%${params.search}%`,
          },
        },
        {
          city: {
            [Op.iLike]: `%${params.search}%`,
          },
        },
        {
          location: {
            [Op.iLike]: `%${params.search}%`,
          },
        },
      ],
    });
  }

  const locationList = await Location.findAndCountAll({
    where,
    limit,
    offset,
    order: [[sortBy, orderBy]],
  });

  return locationList;
};

exports.findLocationById = async (id) => {
  return await Location.findOne({
    where: {
      id: id,
    },
  });
};

exports.removeLocationById = async (id) => {
  return await Location.destroy({
    where: {
      id,
    },
  });
};

exports.updateLocationById = async (params, id) => {
  return await Location.update(params, { where: { id } });
};
