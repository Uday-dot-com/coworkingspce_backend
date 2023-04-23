const { MESSAGES, CONSTANTS } = require('../../../configs');

const { BadRequestException } = require('../../../helpers/errorResponse');
const adminRepository = require('../admin.repository');
const { logger, sendMail } = require('../../../utilities');
const { USER } = require('../../../configs/constants');

module.exports = async (data) => {
    const { walletAddress, firstName, lastName, userName, role, email, description, profilePicUrl, socialLinks, phone } = data;
    let checkExist = false;
    if (role === USER.roles.admin) {
        checkExist = true;
        throw new BadRequestException(MESSAGES.USER.userRoleMismatched);
    }
    let isAlreadyExists = await adminRepository.findUserExistOrNot(walletAddress, userName, phone, email);
    if (isAlreadyExists) {
        if (isAlreadyExists.walletAddress === walletAddress && isAlreadyExists.isBlocked) {
            checkExist = true;
            throw new BadRequestException(MESSAGES.USER.blockedState);
        } else if (isAlreadyExists.walletAddress === walletAddress) {
            checkExist = true;
            throw new BadRequestException(MESSAGES.USER.walledExist);
        } else if (isAlreadyExists.userName === userName) {
            checkExist = true;
            throw new BadRequestException(MESSAGES.USER.isUserNameExists);
        } else if (isAlreadyExists.email === email) {
            checkExist = true;
            throw new BadRequestException(MESSAGES.USER.isUserEmailExists);
        } else if (isAlreadyExists.phone === phone && phone != null) {
            checkExist = true;
            throw new BadRequestException(MESSAGES.USER.isUserPhoneExists);
        }
    }

    if (!checkExist) {
        sendMail('welcomeMail', {
            name: firstName,
            email: email,
            profile: CONSTANTS.UPLOAD.profileImage.defaultImage,
            url: CONSTANTS.APP.frontendUrl,
        });
        const user = { walletAddress, firstName, lastName, userName, role, email, description, profilePicUrl, socialLinks, phone };
        try {
            const response = await adminRepository.createUser(user);
            const responsePayload = {
                id: response.id,
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                email: email,
                phone: phone,
                profilePicUrl: profilePicUrl,
                walletAddress: walletAddress,
                role: role,
                description: user.description,
                socialLinks: socialLinks,
            };
            return responsePayload;
        } catch (error) {
            logger.error('exception occured in user create profile API');
            throw new BadRequestException(error.message);
        }
    }
};
