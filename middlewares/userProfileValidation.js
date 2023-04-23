const { MESSAGES, CONSTANTS } = require('../configs');
const { PreconditionException, BadRequestException } = require('../helpers/errorResponse');
const { User } = require('../database/models');
const { profile, emailVerified } = CONSTANTS.USER.validationTypes;

module.exports =
    (validationTypes = []) =>
    async (req, res, next) => {
        try {
            if (!req.user) throw new BadRequestException(MESSAGES.MIDDLEWARE.userProfile.userNotFound);

            const userProfileDetails = await User.findOne({
                where: {
                    id: req.user.id,
                },
            });

            if (!userProfileDetails) throw new BadRequestException(MESSAGES.MIDDLEWARE.userProfile.userNotFound);

            if (validationTypes.includes(profile)) {
                if (
                    !userProfileDetails.firstName ||
                    !userProfileDetails.lastName ||
                    !userProfileDetails.userName ||
                    !userProfileDetails.email
                ) {
                    throw new PreconditionException(MESSAGES.MIDDLEWARE.userProfile.profileIncomplete);
                }

                if (!userProfileDetails.socialLinks) {
                    throw new PreconditionException(MESSAGES.MIDDLEWARE.userProfile.socialMediaLinkNotAdded);
                }
            }

            if (validationTypes.includes(emailVerified) && !userProfileDetails.emailVerified) {
                throw new PreconditionException(MESSAGES.MIDDLEWARE.userProfile.emailNotVerfied);
            }

            next();
        } catch (error) {
            next(error);
        }
    };
