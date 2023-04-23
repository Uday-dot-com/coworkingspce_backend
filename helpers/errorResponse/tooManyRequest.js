const { HTTP_CODES } = require('../../configs');

class TooManyRequests extends Error {
    constructor(message, err = null) {
        super(message);
        this.type = 'Too Many Requests';
        this.statusCode = HTTP_CODES.TOO_MANY_REQUESTS;
        this.err = err;
    }
}

module.exports = TooManyRequests;
