const { CONSTANTS } = require('../../../configs');
const request = require('supertest');
const app = require('../../../app');

let walletAddress = CONSTANTS.TEST.WALLET_ADDRESS;
let signature = CONSTANTS.TEST.SIGNATURE;

exports.userProfileCreationTest = () => {
    it('user logging success', async function () {
        if (walletAddress && signature) {
            const response = await request(app).post('/user/connect/wallet').send({
                walletAddress: walletAddress,
                signature: signature,
            });
            CONSTANTS.TESTCASE.userAccessToken = response.body.data.accessToken;
            expect(response.statusCode).toBe(200);
        }
    }, 20000);

    it('checks 412 precondtions, walletAddress not be empty', function (done) {
        request(app)
            .post('/user/connect/wallet')
            .send({ walletAddress: '', signature: '' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(412, {
                error: {
                    code: 412,
                    type: 'Precondition Failed',
                    message: '"walletAddress" is not allowed to be empty',
                    data: {
                        message: '"walletAddress" is not allowed to be empty',
                        path: ['walletAddress'],
                        type: 'string.empty',
                        context: {
                            label: 'walletAddress',
                            value: '',
                            key: 'walletAddress',
                        },
                    },
                },
            })
            .end(done);
    });

    it('checks 412 precondtions, Signature not be empty', function (done) {
        request(app)
            .post('/user/connect/wallet')
            .send({ walletAddress: walletAddress, signature: '' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(412, {
                error: {
                    code: 412,
                    type: 'Precondition Failed',
                    message: '"signature" is not allowed to be empty',
                    data: {
                        message: '"signature" is not allowed to be empty',
                        path: ['signature'],
                        type: 'string.empty',
                        context: {
                            label: 'signature',
                            value: '',
                            key: 'signature',
                        },
                    },
                },
            })
            .end(done);
    });

    it('checks 412 precondtions,WalletAddress required', function (done) {
        request(app)
            .post('/user/connect/wallet')
            .send()
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(412, {
                error: {
                    code: 412,
                    type: 'Precondition Failed',
                    message: '"walletAddress" is required',
                    data: {
                        message: '"walletAddress" is required',
                        path: ['walletAddress'],
                        type: 'any.required',
                        context: {
                            label: 'walletAddress',
                            key: 'walletAddress',
                        },
                    },
                },
            })
            .end(done);
    });

    it('checks 412 precondtions,Signature required', function (done) {
        request(app)
            .post('/user/connect/wallet')
            .send({ walletAddress: walletAddress })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(412, {
                error: {
                    code: 412,
                    type: 'Precondition Failed',
                    message: '"signature" is required',
                    data: {
                        message: '"signature" is required',
                        path: ['signature'],
                        type: 'any.required',
                        context: {
                            label: 'signature',
                            key: 'signature',
                        },
                    },
                },
            })
            .end(done);
    });
};

exports.fetchUserProfileTest = () => {
    it('User Get Profile 200 Success Status', async () => {
        let accessToken = CONSTANTS.TESTCASE.userAccessToken;

        const getProfile = await request(app).get('/user/profile').set('Authorization', `Bearer ${accessToken}`);

        expect(getProfile.statusCode).toBe(200);
        expect(getProfile.body.data.walletAddress).toEqual(walletAddress);
    });

    it('User Get Profile 401 Unauthorization Status', function (done) {
        request(app)
            .get('/user/profile')
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
};

exports.userProfileUpdateTest = () => {
    it('Update User Profile- User Get Profile 412 Precondtions Status, FirstName required', function (done) {
        let accessToken = CONSTANTS.TESTCASE.userAccessToken;

        request(app)
            .patch('/user/profile')
            .set('Authorization', `Bearer ${accessToken}`)
            .send()
            .expect(412, {
                error: {
                    code: 412,
                    type: 'Precondition Failed',
                    message: '"firstName" is required',
                    data: {
                        message: '"firstName" is required',
                        path: ['firstName'],
                        type: 'any.required',
                        context: {
                            label: 'firstName',
                            key: 'firstName',
                        },
                    },
                },
            })
            .end(done);
    });

    it('Update User Profile- User Get Profile 412 Precondtions Status, FirstName not empty', function (done) {
        let accessToken = CONSTANTS.TESTCASE.userAccessToken;

        request(app)
            .patch('/user/profile')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ firstName: '' })
            .expect(412, {
                error: {
                    code: 412,
                    type: 'Precondition Failed',
                    message: '"firstName" is not allowed to be empty',
                    data: {
                        message: '"firstName" is not allowed to be empty',
                        path: ['firstName'],
                        type: 'string.empty',
                        context: {
                            label: 'firstName',
                            value: '',
                            key: 'firstName',
                        },
                    },
                },
            })
            .end(done);
    });

    it('Update User Profile - User Get Profile 412 Precondtions Status, LastName required', function (done) {
        let accessToken = CONSTANTS.TESTCASE.userAccessToken;

        request(app)
            .patch('/user/profile')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ firstName: 'joe' })
            .expect(412, {
                error: {
                    code: 412,
                    type: 'Precondition Failed',
                    message: '"lastName" is required',
                    data: {
                        message: '"lastName" is required',
                        path: ['lastName'],
                        type: 'any.required',
                        context: {
                            label: 'lastName',
                            key: 'lastName',
                        },
                    },
                },
            })
            .end(done);
    });

    it('Update User Profile - User Get Profile 412 Precondtions Status, LastName not empty', function (done) {
        let accessToken = CONSTANTS.TESTCASE.userAccessToken;

        request(app)
            .patch('/user/profile')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ firstName: 'joe', lastName: '' })
            .expect(412, {
                error: {
                    code: 412,
                    type: 'Precondition Failed',
                    message: '"lastName" is not allowed to be empty',
                    data: {
                        message: '"lastName" is not allowed to be empty',
                        path: ['lastName'],
                        type: 'string.empty',
                        context: {
                            label: 'lastName',
                            value: '',
                            key: 'lastName',
                        },
                    },
                },
            })
            .end(done);
    });

    it('Update User Profile - User Get Profile 412 Precondtions Status, UserName required', function (done) {
        let accessToken = CONSTANTS.TESTCASE.userAccessToken;

        request(app)
            .patch('/user/profile')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ firstName: 'joe', lastName: 'Doe' })
            .expect(412, {
                error: {
                    code: 412,
                    type: 'Precondition Failed',
                    message: '"userName" is required',
                    data: {
                        message: '"userName" is required',
                        path: ['userName'],
                        type: 'any.required',
                        context: {
                            label: 'userName',
                            key: 'userName',
                        },
                    },
                },
            })
            .end(done);
    });

    it('Update User Profile - User Get Profile 412 Precondtions Status, UserName not empty', function (done) {
        let accessToken = CONSTANTS.TESTCASE.userAccessToken;

        request(app)
            .patch('/user/profile')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ firstName: 'joe', lastName: 'Doe', userName: '' })
            .expect(412, {
                error: {
                    code: 412,
                    type: 'Precondition Failed',
                    message: '"userName" is not allowed to be empty',
                    data: {
                        message: '"userName" is not allowed to be empty',
                        path: ['userName'],
                        type: 'string.empty',
                        context: {
                            label: 'userName',
                            value: '',
                            key: 'userName',
                        },
                    },
                },
            })
            .end(done);
    });

    it('Update User Profile - User Get Profile 412 Precondtions Status, Email required', function (done) {
        let accessToken = CONSTANTS.TESTCASE.userAccessToken;

        request(app)
            .patch('/user/profile')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ firstName: 'joe', lastName: 'Doe', userName: 'johndoe_123' })
            .expect(412, {
                error: {
                    code: 412,
                    type: 'Precondition Failed',
                    message: '"email" is required',
                    data: {
                        message: '"email" is required',
                        path: ['email'],
                        type: 'any.required',
                        context: {
                            label: 'email',
                            key: 'email',
                        },
                    },
                },
            })
            .end(done);
    });

    it('Update User Profile - User Get Profile 412 Precondtions Status, Email not empty', function (done) {
        let accessToken = CONSTANTS.TESTCASE.userAccessToken;

        request(app)
            .patch('/user/profile')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ firstName: 'joe', lastName: 'Doe', userName: 'johndoe_123', email: '' })
            .expect(412, {
                error: {
                    code: 412,
                    type: 'Precondition Failed',
                    message: '"email" is not allowed to be empty',
                    data: {
                        message: '"email" is not allowed to be empty',
                        path: ['email'],
                        type: 'string.empty',
                        context: {
                            label: 'email',
                            value: '',
                            key: 'email',
                        },
                    },
                },
            })
            .end(done);
    });

    it('Update User Profile - User Get Profile 200 Success Status, Profile update', function (done) {
        let accessToken = CONSTANTS.TESTCASE.userAccessToken;

        request(app)
            .patch('/user/profile')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ firstName: 'joe', lastName: 'Doe', userName: 'johndoe_123', email: 'johndoe@example.com' })
            .expect(200)
            .end(done);
    });

    it('Update User Profile - User Get Profile 412 Precondtions Status, UserName String Pattern', function (done) {
        let accessToken = CONSTANTS.TESTCASE.userAccessToken;
        request(app)
            .patch('/user/profile')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ firstName: 'joe', lastName: 'Doe', userName: 'john', email: 'johndoe@example.com' })
            .expect(412, {
                error: {
                    code: 412,
                    type: 'Precondition Failed',
                    message:
                        '"userName" with value "john" fails to match the required pattern: /^(?!.*\\.\\.)(?!.*\\.$)[^\\W][\\w.]{4,29}$/',
                    data: {
                        message:
                            '"userName" with value "john" fails to match the required pattern: /^(?!.*\\.\\.)(?!.*\\.$)[^\\W][\\w.]{4,29}$/',
                        path: ['userName'],
                        type: 'string.pattern.base',
                        context: {
                            regex: {},
                            value: 'john',
                            label: 'userName',
                            key: 'userName',
                        },
                    },
                },
            })
            .end(done);
    });
};
