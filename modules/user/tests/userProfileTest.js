const request = require('supertest');
const app = require('../../../app');
const { CONSTANTS } = require('../../../configs');

let walletAddress = CONSTANTS.TEST.WALLET_ADDRESS;
let signature = CONSTANTS.TEST.SIGNATURE;

exports.profileImageUploadTest = () => {
    it('Upload image 200 code status', async function () {
        let accessToken = CONSTANTS.TESTCASE.userAccessToken;

        const response = await request(app)
            .post('/user/profile/image')
            .set('Authorization', `Bearer ${accessToken}`)
            .attach('file', `${__dirname}/static/profileTest.jpg`)
            .set('Content-Type', 'multipart/form-data');
        expect(response.statusCode).toBe(200);
    }, 20000);

    it('checks 415 error, unsupported Media', (done) => {
        let accessToken = CONSTANTS.TESTCASE.userAccessToken;

        request(app)
            .post('/user/profile/image')
            .set('Authorization', `Bearer ${accessToken}`)
            .set('Content-Type', 'multipart/form-data')
            .attach('file', `${__dirname}/static/profileTest.zip`)
            .expect(415, {
                error: {
                    code: 415,
                    type: 'Error',
                    message: 'Invalid image! Only support jpeg|jpg|png extensions',
                    data: {},
                },
            })
            .end(done);
    });
    it('checks 400 error, Maximum file size', (done) => {
        let accessToken = CONSTANTS.TESTCASE.userAccessToken;

        request(app)
            .post('/user/profile/image')
            .set('Authorization', `Bearer ${accessToken}`)
            .set('Content-Type', 'multipart/form-data')
            .attach('file', `${__dirname}/static/15MB.jpg`)
            .expect(400, {
                error: {
                    code: 400,
                    type: 'Bad Request',
                    message: 'File size exceeded! Maximum file size is 15728640 bytes.',
                    data: {},
                },
            })
            .end(done);
    });
    // it('checks 404 error, User not found', (done) => {
    //     request(app)
    //         .post('/user/profile/image')
    //         .set('Authorization', `Bearer ${accessToken}`)
    //         .set('Content-Type', 'multipart/form-data')
    //         .attach('file', `${__dirname}/static/profileTest.jpg`)
    //         .expect(404, {
    //             error: {
    //                 code: 404,
    //                 type: 'Not Found',
    //                 message: 'User not found!',
    //                 data: {},
    //             },
    //         })
    //         .end(done);
    // });
    // it('checks 401 error, Account is blocked', (done) => {
    //     request(app)
    //         .post('/user/profile/image')
    //         .set('Authorization', `Bearer ${accessToken}`)
    //         .set('Content-Type', 'multipart/form-data')
    //         .attach('file', `${__dirname}/static/profileTest.jpg`)
    //         .expect(401, {
    //             error: {
    //                 code: 401,
    //                 type: 'Unauthorized',
    //                 message: 'Account is blocked!',
    //                 data: {},
    //             },
    //         })
    //         .end(done);
    // });
};

exports.deleteProfileImageTest = () => {
    it('Delete Profile Image, 200 status', (done) => {
        let accessToken = CONSTANTS.TESTCASE.userAccessToken;

        request(app)
            .delete('/user/profile/image')
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(200, {
                message: 'Profile image removed successfully',
                data: {
                    id: 12,
                    firstName: 'joe',
                    lastName: 'Doe',
                    userName: 'johndoe_123',
                    email: 'johndoe@example.com',
                    profilePicUrl: null,
                    walletAddress: walletAddress,
                    role: 'user',
                },
            })
            .end(done);
    });

    it('Delete Profile Image, 401-Unauthorized status', (done) => {
        request(app)
            .delete('/user/profile/image')
            .expect('Content-Type', /json/)
            .expect(401, {
                error: {
                    code: 401,
                    type: 'Unauthorized',
                    message: 'Missing authorization header!',
                    data: {},
                },
            })
            .end(done);
    });

    // it('Delete Profile Image, 404-User not found status', (done) => {
    //     request(app)
    //         .delete('/user/profile/image')
    //         .set('Authorization', `Bearer ${accessToken}`)
    //         .expect('Content-Type', /json/)
    //         .expect(404, {
    //             error: {
    //                 code: 404,
    //                 type: 'Not Found',
    //                 message: 'User not found!',
    //                 data: {},
    //             },
    //         })
    //         .end(done);
    // });
};
