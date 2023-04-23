const request = require('supertest');
const app = require('../../../app');
const { CONSTANTS, MESSAGES } = require('../../../configs');
const appRoot = require('app-root-path');

exports.userProfileImageUploadTest = () => {
    it('User Profile Image update, 200 Success Status', (done) => {
        let accessToken = CONSTANTS.TESTCASE.userAccessToken;
        request(app)
            .post('/user/profile/image')
            .set('Authorization', `Bearer ${accessToken}`)
            .set('Content-Type', 'multipart/form-data')
            .attach('file', `${appRoot}/modules/user/static/profileTest.jpg`)
            .expect(200, {
                message: MESSAGES.USER.profileImageUpload,
                data: {
                    id: '1',
                    firstName: 'joe',
                    lastName: 'Doe',
                    userName: 'datawise',
                    email: 'johndoe@example.com',
                    phone: '9048778629',
                    profilePicUrl: 'profile/2d4da719-428f-4b6f-8a8e-210e6b8742e6.png',
                    walletAddress: '0xD719f0F83678fa76f64ea927eE3C11D08473EDA6',
                    role: 'user',
                },
            })
            .end(done);
    }, 20000);

    it('User Profile Image update, Unauthorized status 401', (done) => {
        request(app)
            .post('/user/profile/image')
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

    it('User Profile Image update, 412 Success Status', (done) => {
        let accessToken = CONSTANTS.TESTCASE.userAccessToken;
        request(app)
            .post('/user/profile/image')
            .set('Authorization', `Bearer ${accessToken}`)
            .set('Content-Type', 'multipart/form-data')
            .attach('file', `${appRoot}/modules/user/static/profileTest.zip`)
            .expect(412, {
                error: {
                    code: 412,
                    type: 'Precondition Failed',
                    message: 'Image should be JPEG or PNG',
                    data: {},
                },
            })
            .end(done);
    }, 20000);
};
