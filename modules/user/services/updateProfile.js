const { MESSAGES, CONSTANTS } = require('../../../configs');
const { NotFoundException, UnauthorizedException, BadRequestException } = require('../../../helpers/errorResponse');
const { logger, sendMail, jwt } = require('../../../utilities');

const userRepository = require('../user.repository');

module.exports = async (id, user) => {
    try {
        logger.info('updateProfile-service function initiated');

        const userExists = await userRepository.findUserById(id);
        if (!userExists) throw new NotFoundException(MESSAGES.USER.notFound);
        if (userExists.isBlocked) throw new UnauthorizedException(MESSAGES.USER.blocked);

        // TODO: Handle error of duplication in username and email.
        let isAlreadyExists = await userRepository.findUserExistOrNot(id, user.userName, user.phone, user.email);
        if (isAlreadyExists) {
            if (isAlreadyExists.userName === user.userName) {
                throw new BadRequestException(MESSAGES.USER.isUserNameExists);
            } else if (isAlreadyExists.email === user.email) {
                throw new BadRequestException(MESSAGES.USER.isUserEmailExists);
            } else if (isAlreadyExists.phone === user.phone) {
                throw new BadRequestException(MESSAGES.USER.isUserPhoneExists);
            }
        }
        // check user is  new or not
        const sToken = await jwt.generateToken(
            { id: id, email: user.email },
            CONSTANTS.JWT.tokenSource.verificationLink,
            CONSTANTS.JWT.verificationLink.expiresIn
        );

        if (!userExists.email) {
            // send welcome email
            let url = `${CONSTANTS.APP.frontendUrl}`;
            let verification = false;
            if (CONSTANTS.EMAIL_VERIFICATION === 'true') {
                url = `${CONSTANTS.APP.frontendUrl}/base/verify-email?token=${sToken}`;
                verification = true;
            }
            sendMail('welcomeMail', {
                name: user.firstName,
                email: user.email,
                profile: userExists.profilePicUrl
                    ? CONSTANTS.AWS.baseUrl + userExists.profilePicUrl
                    : CONSTANTS.UPLOAD.profileImage.defaultImage,
                url: url,
                verification: verification,
            });
        } else if (CONSTANTS.EMAIL_VERIFICATION && user.email && user.email !== userExists.email) {
            // send verification email
            let url = `${CONSTANTS.APP.frontendUrl}/base/verify-email?token=${sToken}`;
            sendMail('emailVerification', {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: url,
            });
            user.emailVerified = false;
        }

        await userRepository.updateUser(user, id);

        const responsePayload = {
            id: userExists.id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            phone: user.phone,
            profilePicUrl: userExists.profilePicUrl,
            walletAddress: userExists.walletAddress,
            role: userExists.role,
            description: userExists.description,
            socialLinks: userExists.socialLinks,
            mobileNumber: userExists.mobileNumber,
            emailVerified: userExists.emailVerified,
        };

        logger.info('updateProfile-service function ended');

        return responsePayload;
    } catch (error) {
        logger.error('exception occured in update profile API');
        throw error;
    }
};
