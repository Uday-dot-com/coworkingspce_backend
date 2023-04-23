const { MESSAGES } = require('../configs');
const { UnauthorizedException, BadRequestException } = require('../helpers/errorResponse');
const { User } = require('../database/models');

module.exports = () => async (req, res, next) => {
    try {
        const userProfileDetails = await User.findOne({
            where: {
                id: req.user.id,
            },
        });

        if (!userProfileDetails) throw new BadRequestException(MESSAGES.MIDDLEWARE.userProfile.userNotFound);

        if (userProfileDetails.role != req.user.role) throw new UnauthorizedException(MESSAGES.MIDDLEWARE.authorization.roleMismatch);
        else next();
    } catch (error) {
        next(error);
    }
};
