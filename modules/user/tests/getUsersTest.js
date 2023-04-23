const request = require('supertest');
const app = require('../../../app');
const { CONSTANTS } = require('../../../configs');
require('dotenv').config();

let accessToken = '';

exports.getUserListByAdminTest = () => {
    it('checks 412 precondtions, page not be empty', function (done) {
        let accessToken = CONSTANTS.TESTCASE.adminAccessToken;

        request(app)
            .get('/user')
            .query({ page: '', items: '' })
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(412, {
                error: {
                    code: 412,
                    type: 'Precondition Failed',
                    message: '"page" must be a number',
                    data: {
                        message: '"page" must be a number',
                        path: ['page'],
                        type: 'number.base',
                        context: { label: 'page', value: '', key: 'page' },
                    },
                },
            })
            .end(done);
    });

    it('checks 412 precondtions, items required', function (done) {
        let accessToken = CONSTANTS.TESTCASE.adminAccessToken;

        request(app)
            .get('/user/')
            .query({ page: 5 })
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(412, {
                error: {
                    code: 412,
                    type: 'Precondition Failed',
                    message: '"items" is required',
                    data: {
                        message: '"items" is required',
                        path: ['items'],
                        type: 'any.required',
                        context: {
                            label: 'items',
                            key: 'items',
                        },
                    },
                },
            })
            .end(done);
    });

    it('checks 412 precondtions, Items not be empty', function (done) {
        let accessToken = CONSTANTS.TESTCASE.adminAccessToken;

        request(app)
            .get('/user/')
            .query({ page: 5, items: '' })
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(412, {
                error: {
                    code: 412,
                    type: 'Precondition Failed',
                    message: '"items" must be a number',
                    data: {
                        message: '"items" must be a number',
                        path: ['items'],
                        type: 'number.base',
                        context: { label: 'items', value: '', key: 'items' },
                    },
                },
            })
            .end(done);
    });

    it('checks 412 precondtions,Page required', function (done) {
        let accessToken = CONSTANTS.TESTCASE.adminAccessToken;

        request(app)
            .get('/user/')
            .query()
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(412, {
                error: {
                    code: 412,
                    type: 'Precondition Failed',
                    message: '"page" is required',
                    data: {
                        message: '"page" is required',
                        path: ['page'],
                        type: 'any.required',
                        context: {
                            label: 'page',
                            key: 'page',
                        },
                    },
                },
            })
            .end(done);
    });

    it('Users Get  200 Success Status', async () => {
        let accessToken = CONSTANTS.TESTCASE.adminAccessToken;

        const getUsers = await request(app).get('/user').query({ page: 1, items: 2 }).set('Authorization', `Bearer ${accessToken}`);
        expect(getUsers.statusCode).toBe(200);
    });

    it('Users Get 401 Unauthorization Status', function (done) {
        request(app)
            .get('/user')
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
