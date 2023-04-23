const request = require('supertest');
const app = require('../../../app');
const { CONSTANTS, MESSAGES } = require('../../../configs');

exports.userRemoveProfileImageTest = () => {
    it('User Remove Profile Image success status,200', (done) => {
        let accessToken = CONSTANTS.TESTCASE.userAccessToken;

        request(app)
            .delete('/user/profile/image')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(200, {
                message: 'Profile image removed successfully',
                data: {
                    id: '1',
                    firstName: 'joe',
                    lastName: 'Doe',
                    userName: 'datawise',
                    email: 'johndoe@example.com',
                    profilePicUrl: null,
                    walletAddress: '0xD719f0F83678fa76f64ea927eE3C11D08473EDA6',
                    role: 'user',
                },
            })
            .end(done);
    });

    it('User Remove Profile Image Unauthorized status,401', (done) => {
        request(app)
            .delete('/user/profile/image')
            .send()
            .expect('Content-Type', /json/)
            .expect(401, {
                error: {
                    code: 401,
                    type: 'Unauthorized',
                    message: MESSAGES.MIDDLEWARE.authorization.missingHeader,
                    data: {},
                },
            })
            .end(done);
    });
};
