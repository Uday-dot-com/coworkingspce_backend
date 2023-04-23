const { MESSAGES, CONSTANTS } = require('../configs');
const { UnauthorizedException } = require('../helpers/errorResponse');
const jwt = require('jsonwebtoken');

exports.verifyToken = (token, source) => {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
        jwt.verify(token, CONSTANTS.JWT.secret, (err, decoded) => {
            if (err) throw new UnauthorizedException(MESSAGES.JWT.invalidToken);
            if (decoded.source !== source) throw new UnauthorizedException(MESSAGES.JWT.invalidTokenSource);
            resolve(decoded);
        });
    });
};

exports.generateAccessToken = (payload) => {
    return jwt.sign({ ...payload, source: CONSTANTS.JWT.tokenSource.accessToken }, CONSTANTS.JWT.secret, {
        expiresIn: CONSTANTS.JWT.accessToken.expiresIn,
    });
};

exports.generateRefreshToken = (payload) => {
    return jwt.sign({ ...payload, source: CONSTANTS.JWT.tokenSource.refreshToken }, CONSTANTS.JWT.secret, {
        expiresIn: CONSTANTS.JWT.refreshToken.expiresIn,
    });
};

exports.generateToken = (payload, source, expiry = '60m') => {
    return jwt.sign({ ...payload, source }, CONSTANTS.JWT.secret, {
        expiresIn: expiry,
    });
};
