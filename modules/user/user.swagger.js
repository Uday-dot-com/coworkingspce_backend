const { generateSwaggerAPI } = require('../../modules/swagger/generateSwaggerAPI');
const {
    CONSTANTS: { SWAGGER, USER },
    MESSAGES,
} = require('../../configs');

exports.userPath = {
    '/user/connect/wallet': {
        ...generateSwaggerAPI({
            tag: SWAGGER.tags.user,
            operationId: 'connectWallet',
            method: SWAGGER.methods.post,
            description: 'Connect wallet of the user',
            requestBodyRef: '#/definitions/ConnectWalletInput',
            responseStatuses: {
                200: {
                    ref: '#/definitions/ConnectWalletResponse',
                },
                401: false,
                415: false,
            },
        }),
    },
    '/user/profile': {
        ...generateSwaggerAPI({
            tag: SWAGGER.tags.user,
            operationId: 'updateProfile',
            method: SWAGGER.methods.patch,
            security: true,
            description: 'Update profile of the user',
            requestBodyRef: '#/definitions/UpdateProfileInput',
            responseStatuses: {
                200: {
                    ref: '#/definitions/UpdateProfileResponse',
                },
                415: false,
            },
        }),
        ...generateSwaggerAPI({
            tag: SWAGGER.tags.user,
            operationId: 'getProfile',
            method: SWAGGER.methods.get,
            security: true,
            description: 'Get profile of the user',
            responseStatuses: {
                200: {
                    ref: '#/definitions/GetProfileResponse',
                },
                412: false,
                415: false,
            },
        }),
    },
    '/user/profile/{id}': {
        ...generateSwaggerAPI({
            tag: SWAGGER.tags.user,
            operationId: 'viewProfile',
            method: SWAGGER.methods.get,
            description: 'view profile of the user by id',
            parameters: [
                {
                    type: 'integer',
                    in: 'path',
                    name: 'id',
                    required: ['id'],
                },
            ],
            responseStatuses: {
                200: {
                    ref: '#/definitions/ViewProfileResponse',
                },
                412: false,
                415: false,
            },
        }),
    },
    '/user': {
        ...generateSwaggerAPI({
            tag: SWAGGER.tags.user,
            operationId: 'getUsers',
            method: SWAGGER.methods.get,
            security: true,
            description: 'get profile of the users',
            parameters: [
                {
                    type: 'integer',
                    in: 'query',
                    name: 'page',
                    required: ['page'],
                    default: 1,
                },
                {
                    type: 'integer',
                    in: 'query',
                    name: 'items',
                    required: ['items'],
                    default: 5,
                },
            ],
            responseStatuses: {
                200: {
                    ref: '#/definitions/GetUsersResponse',
                },
                415: false,
            },
        }),
    },
    '/user/profile/image': {
        ...generateSwaggerAPI({
            tag: SWAGGER.tags.user,
            operationId: 'updateProfileImage',
            method: SWAGGER.methods.post,
            security: true,
            description: 'Update profile image of the user',
            requestBodyRef: '#/definitions/UpdateProfileImageInput',
            requestBodyContentType: 'multipart/form-data',
            responseStatuses: {
                200: {
                    ref: '#/definitions/UpdateProfileImageResponse',
                },
                412: false,
            },
        }),

        ...generateSwaggerAPI({
            tag: SWAGGER.tags.user,
            operationId: 'removeProfileImage',
            method: SWAGGER.methods.delete,
            security: true,
            description: 'Remove profile image of the user',
            responseStatuses: {
                200: {
                    ref: '#/definitions/UpdateProfileImageResponse',
                },
                412: false,
                415: false,
            },
        }),
    },
    '/user/profile/bannerImage': {
        ...generateSwaggerAPI({
            tag: SWAGGER.tags.user,
            operationId: 'updateProfileBannerImage',
            method: SWAGGER.methods.post,
            security: true,
            description: 'Update profile banner image of the user',
            requestBodyRef: '#/definitions/UpdateProfileImageInput',
            requestBodyContentType: 'multipart/form-data',
            responseStatuses: {
                200: {
                    ref: '#/definitions/UpdateProfileBannerImageResponse',
                },
                412: false,
            },
        }),

        ...generateSwaggerAPI({
            tag: SWAGGER.tags.user,
            operationId: 'removeProfileBannerImage',
            method: SWAGGER.methods.delete,
            security: true,
            description: 'Remove profile banner image of the user',
            responseStatuses: {
                200: {
                    ref: '#/definitions/UpdateProfileBannerImageResponse',
                },
                412: false,
                415: false,
            },
        }),
    },
    '/user/{userId}': {
        ...generateSwaggerAPI({
            tag: SWAGGER.tags.user,
            operationId: 'getUserById',
            method: SWAGGER.methods.get,
            security: true,
            parameters: [
                {
                    type: 'string',
                    in: 'path',
                    name: 'userId',
                    required: ['userId'],
                },
            ],
            description: 'Get By User ID For Admin',
            responseStatuses: {
                200: {
                    ref: '#/definitions/GetUserByIdResponse',
                },
                401: true,
                415: false,
            },
        }),
    },
    '/user/refreshToken': {
        ...generateSwaggerAPI({
            tag: SWAGGER.tags.user,
            operationId: 'userRefreshToken',
            method: SWAGGER.methods.post,
            security: true,
            description: 'Refresh token API of the user to get new access token & refresh token',
            responseStatuses: {
                200: {
                    ref: '#/definitions/UserRefreshTokenResponse',
                },
                401: false,
                415: false,
            },
        }),
    },
    '/user/email/verify': {
        ...generateSwaggerAPI({
            tag: SWAGGER.tags.user,
            operationId: 'verifyEmail',
            method: SWAGGER.methods.post,
            description: 'Verify email id of the user',
            requestBodyRef: '#/definitions/VerifyEmailInput',
            responseStatuses: {
                200: {
                    ref: '#/definitions/VerifyEmailResponse',
                },
                401: false,
                415: false,
            },
        }),
    },
    '/user/email/resend': {
        ...generateSwaggerAPI({
            tag: SWAGGER.tags.user,
            operationId: 'resendVerifyEmail',
            method: SWAGGER.methods.post,
            description: 'Resend verification email to the user',
            requestBodyRef: '#/definitions/ResendVerifyEmailInput',
            responseStatuses: {
                200: {
                    ref: '#/definitions/ResendVerifyEmailResponse',
                },
                401: false,
                415: false,
            },
        }),
    },
};

const userSchema = {
    id: {
        type: 'number',
        description: 'An id of a user',
        example: 1,
    },
    firstName: {
        type: 'string',
        description: 'First Name of the user',
        example: 'John',
    },
    lastName: {
        type: 'string',
        description: 'Last Name of the user',
        example: 'Doe',
    },
    userName: {
        type: 'string',
        description:
            'Username of the user. Username is 4-29 characters long, can contain only letters, numbers, underscores and period, and cannot start with a period or underscore. Cannot contain consecutive periods or underscores. Cannot end with a period or underscore.',
        example: 'johndoe_123',
    },
    profilePicUrl: {
        type: 'string',
        description: 'Profile Pic Url of the user',
        example: 'https://i.stack.imgur.com/34AD2.jpg',
    },
    email: {
        type: 'string',
        description: 'Email of the user',
        example: 'johndoe@example.com',
    },
    walletAddress: {
        type: 'string',
        description: 'Wallet Address of the user',
        example: '0x1234567890123456789012345678901234567890',
    },
    role: {
        type: 'string',
        description: 'Role of the user',
        enum: [USER.roles.user],
    },
    description: {
        type: 'string',
        description: 'Brief description about the user',
        example: 'I am John Doe',
    },
    socialLinks: {
        type: 'object',
        properties: {
            facebookUrl: {
                type: 'string',
                description: 'facebook URL address',
                example: 'https://facebook.com/constantcontact',
            },
            twitterUrl: {
                type: 'string',
                description: 'facebook URL address',
                example: 'https://twitter.com/constantcontact',
            },
            instagramUrl: {
                type: 'string',
                description: 'facebook URL address',
                example: 'https://www.instagram.com/constantcontact',
            },
            websiteUrl: {
                type: 'string',
                description: 'socialmedia URL address',
                example: 'https://www.pinterest.com/',
            },
        },
    },
    bannerImage: {
        type: 'string',
        description: 'bannerImage location id',
        example: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay',
    },
    phone: {
        type: 'string',
        description: 'User phone number',
        example: '7458965215',
    },
};

exports.userDefinitions = {
    User: {
        type: 'object',
        properties: {
            ...userSchema,
        },
    },

    ConnectWalletInput: {
        type: 'object',
        properties: {
            walletAddress: {
                type: 'string',
                description: 'Wallet address of the user',
                example: '0x6b8Bc426069b4e9BD9D8268C376fC66EdDE8dCA2',
            },
            signature: {
                type: 'string',
                description: 'Signature of that wallet address',
                example:
                    '0xe556449be5afe810c1114546bae9de2a7c958e7209dad55fd31a1b1af94bf37d2e58ae34ff956bb8a76c0eb971f65ff30730f2d3e5f310d9bbec1829236b2e7c1c',
            },
            email: {
                type: 'string',
                description: 'Email address of the user',
                example: 'example@nft.com',
            },
        },
        required: ['walletAddress', 'signature'],
    },

    ConnectWalletResponse: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                example: MESSAGES.USER.walletConnected,
            },
            data: {
                allOf: [
                    {
                        $ref: '#/definitions/User',
                    },
                    {
                        properties: {
                            accessToken: {
                                type: 'string',
                                description: 'Access token of the user',
                                example:
                                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InVzZXIiLCJzb3VyY2UiOiJhY2Nlc3MtdG9rZW4iLCJpYXQiOjE2NDgzMTk5MzgsImV4cCI6MTY0ODQwNjMzOH0.WdhNB0Jb0nycgDMmz1CCxoxL3vh53dLGP4COXrDGE',
                            },
                            refreshToken: {
                                type: 'string',
                                description: 'Refresh token of the user',
                                example:
                                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InVzZXIiLCJzb3VyY2UiOiJhY2Nlc3MtdG9rZW4iLCJpYXQiOjE2NDgzMTk5MzgsImV4cCI6MTY0ODQwNjMzOH0.WdhNB0Jb0nycgDMmz1CCxoxL3vh53dLGP4COXrDGE',
                            },
                        },
                    },
                ],
            },
        },
    },

    UserRefreshTokenResponse: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                example: MESSAGES.USER.userToken,
            },
            data: {
                allOf: [
                    {
                        properties: {
                            accessToken: {
                                type: 'string',
                                description: 'Access token of the user',
                                example:
                                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InVzZXIiLCJzb3VyY2UiOiJhY2Nlc3MtdG9rZW4iLCJpYXQiOjE2NDgzMTk5MzgsImV4cCI6MTY0ODQwNjMzOH0.WdhNB0Jb0nycgDMmz1CCxoxL3vh53dLGP4COXrDGE',
                            },
                            refreshToken: {
                                type: 'string',
                                description: 'Refresh token of the user',
                                example:
                                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InVzZXIiLCJzb3VyY2UiOiJhY2Nlc3MtdG9rZW4iLCJpYXQiOjE2NDgzMTk5MzgsImV4cCI6MTY0ODQwNjMzOH0.WdhNB0Jb0nycgDMmz1CCxoxL3vh53dLGP4COXrDGE',
                            },
                        },
                    },
                ],
            },
        },
    },

    UpdateProfileInput: {
        type: 'object',
        properties: {
            firstName: userSchema.firstName,
            lastName: userSchema.lastName,
            userName: userSchema.userName,
            email: userSchema.email,
            description: userSchema.description,
            socialLinks: userSchema.socialLinks,
            mobileNumber: userSchema.mobileNumber,
        },
        required: ['firstName', 'lastName', 'userName', 'email'],
    },

    UpdateProfileResponse: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                example: MESSAGES.USER.profileUpdated,
            },
            data: {
                $ref: '#/definitions/User',
            },
        },
    },

    ViewProfileResponse: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                example: MESSAGES.USER.getProfile,
            },
            data: {
                type: 'object',
                properties: {
                    id: {
                        type: 'number',
                        description: 'An id of a user',
                        example: 1,
                    },
                    firstName: {
                        type: 'string',
                        description: 'First Name of the user',
                        example: 'John',
                    },
                    lastName: {
                        type: 'string',
                        description: 'Last Name of the user',
                        example: 'Doe',
                    },
                    userName: {
                        type: 'string',
                        description:
                            'Username of the user. Username is 4-29 characters long, can contain only letters, numbers, underscores and period, and cannot start with a period or underscore. Cannot contain consecutive periods or underscores. Cannot end with a period or underscore.',
                        example: 'johndoe_123',
                    },
                    profilePicUrl: {
                        type: 'string',
                        description: 'Profile Pic Url of the user',
                        example: 'https://i.stack.imgur.com/34AD2.jpg',
                    },
                    description: {
                        type: 'string',
                        description: 'Brief description about the user',
                        example: 'I am John Doe',
                    },
                    socialLinks: {
                        type: 'object',
                        properties: {
                            facebookUrl: {
                                type: 'string',
                                description: 'facebook URL address',
                                example: 'https://facebook.com/constantcontact',
                            },
                            twitterUrl: {
                                type: 'string',
                                description: 'facebook URL address',
                                example: 'https://twitter.com/constantcontact',
                            },
                            instagramUrl: {
                                type: 'string',
                                description: 'facebook URL address',
                                example: 'https://www.instagram.com/constantcontact',
                            },
                            websiteUrl: {
                                type: 'string',
                                description: 'socialmedia URL address',
                                example: 'https://www.pinterest.com/',
                            },
                        },
                    },
                    bannerImage: {
                        type: 'string',
                        description: 'bannerImage location id',
                        example: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay',
                    },
                },
            },
        },
    },

    GetProfileResponse: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                example: MESSAGES.USER.getProfile,
            },
            data: {
                $ref: '#/definitions/User',
            },
        },
    },

    UpdateProfileImageInput: {
        type: 'object',
        properties: {
            file: {
                type: 'file',
                description: 'Profile image',
            },
        },
        required: ['file'],
    },

    UpdateProfileImageResponse: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                example: MESSAGES.USER.profileImageUpload,
            },
            data: {
                $ref: '#/definitions/User',
            },
        },
    },
    UpdateProfileBannerImageResponse: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                example: MESSAGES.USER.profileBannerImageUpload,
            },
            data: {
                $ref: '#/definitions/User',
            },
        },
    },
    GetUsersResponse: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                example: MESSAGES.USER.getProfile,
            },
            data: {
                type: 'object',
                properties: {
                    pageMeta: {
                        type: 'object',
                        properties: {
                            totalItems: {
                                type: 'number',
                                description: 'total Items of Users',
                                example: 1,
                            },
                            page: {
                                type: 'number',
                                description: 'Users Page',
                                example: 1,
                            },
                            items: {
                                type: 'number',
                                description: 'User Items',
                                example: 1,
                            },
                        },
                    },
                    userList: {
                        type: 'array',
                        items: {
                            allOf: [
                                {
                                    $ref: '#/definitions/User',
                                },
                                {
                                    properties: {
                                        emailVerified: {
                                            type: 'boolean',
                                            description: 'User email verified status',
                                            example: true,
                                        },
                                        totalTransactionValue: {
                                            type: 'float',
                                            description: 'Total transaction value for User',
                                            example: 0.227,
                                        },
                                        totalAssets: {
                                            type: 'string',
                                            description: 'Total assets created by User',
                                            example: '0',
                                        },
                                        totalCollections: {
                                            type: 'string',
                                            description: 'Total collections created by User',
                                            example: '0',
                                        },
                                        isBlocked: {
                                            type: 'boolean',
                                            description: 'User blocked status',
                                            example: false,
                                        },
                                        createdAt: {
                                            type: 'string',
                                            example: '2022-04-06T14:03:38.515Z',
                                        },
                                        updatedAt: {
                                            type: 'string',
                                            example: '2022-04-25T09:11:42.089Z',
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        },
    },
    GetUserByIdResponse: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                example: MESSAGES.USER.getProfile,
            },
            data: {
                allOf: [
                    {
                        $ref: '#/definitions/User',
                    },
                    {
                        properties: {
                            emailVerified: {
                                type: 'boolean',
                                description: 'User email verified status',
                                example: true,
                            },
                            isBlocked: {
                                type: 'boolean',
                                description: 'User blocked status',
                                example: false,
                            },
                            createdAt: {
                                type: 'string',
                                example: '2022-04-06T14:03:38.515Z',
                            },
                            updatedAt: {
                                type: 'string',
                                example: '2022-04-25T09:11:42.089Z',
                            },
                        },
                    },
                ],
            },
        },
    },
    VerifyEmailInput: {
        type: 'object',
        properties: {
            token: {
                type: 'string',
                description: 'User token',
                example: 'random String',
            },
        },
    },
    VerifyEmailResponse: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                example: MESSAGES.USER.emailVerified,
            },
            data: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: MESSAGES.USER.emailVerified,
                    },
                },
            },
        },
    },
    ResendVerifyEmailInput: {
        type: 'object',
        properties: {
            email: {
                type: 'string',
                description: 'User email',
                example: 'example@example.com',
            },
        },
    },
    ResendVerifyEmailResponse: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                example: MESSAGES.USER.emailVerificationLinkSent,
            },
            data: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: MESSAGES.USER.emailVerificationLinkSent,
                    },
                },
            },
        },
    },
};
