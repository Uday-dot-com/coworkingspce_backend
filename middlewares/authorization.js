const { MESSAGES, CONSTANTS } = require('../configs');
const { UnauthorizedException } = require('../helpers/errorResponse');
const { jwt } = require('../utilities');
const { user, creator } = CONSTANTS.USER.roles;

module.exports =
    (allowedRoles = []) =>
    async (req, res, next) => {
        try {
            if (!req.headers.authorization) throw new UnauthorizedException(MESSAGES.MIDDLEWARE.authorization.missingHeader);

            const token = req.headers.authorization.split(' ')[1]; // Extracting Bearer token from header.

            if (!token) throw new UnauthorizedException(MESSAGES.MIDDLEWARE.authorization.missingToken);

            const decoded = await jwt.verifyToken(token, CONSTANTS.JWT.tokenSource.accessToken);

            if (allowedRoles.includes(decoded.role)) {
                req.user = decoded;
                next();
            } else if (allowedRoles.includes(user) && decoded.role == creator) {
                req.user = decoded;
                next();
            } else {
                throw new UnauthorizedException(MESSAGES.MIDDLEWARE.authorization.accessDenied);
            }
        } catch (error) {
            next(error);
        }
    };
