require('dotenv').config();

module.exports = {
    APP: {
        env: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 4000,
        backendUrl: process.env.BACKEND_URL || 'http://localhost:4000',
        frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
        adminUrl: process.env.ADMIN_URL || 'http://localhost:3000',
        siteName: process.env.SITE_NAME || 'NFT Marketplace',
        IPFS_URL: process.env.IPFS_URL || "https://ipfs.io/ipfs/"
    },

    AWS: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        bucketName: process.env.AWS_BUCKET,
        baseUrl: process.env.AWS_IMAGE_URL || 'https://nft-two.s3.amazonaws.com/',
    },

    WALLET: {
        signMessage: process.env.SIGN_MESSAGE,
    },

    JWT: {
        secret: process.env.JWT_SECRET,
        accessToken: {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
        },
        refreshToken: {
            expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
        },
        verificationLink: {
            expiresIn: process.env.JWT_VERIFICATION_LINK_EXPIRES_IN || '60m',
        },
        tokenSource: {
            accessToken: 'access-token',
            refreshToken: 'refresh-token',
            verificationLink: 'verification-link',
            forgotPassword: 'forgot-password',
        },
    },

    SWAGGER: {
        tags: {
            user: 'User',
            admin: 'Admin',
            artist: 'Artist',
            category: 'Category',
            collection: 'Collection',
            asset: 'Asset',
            currency: 'Currency',
            exchange: 'Exchange-Rate',
            common: 'Common',
            order: 'Order',
            dashboard: 'Dashboard',
            favorite: 'Favorite',
            activity: 'Activity-Log',
            follows: 'Follows',
            accounting: 'Accounting',
            subscriber: 'Subscriber',
            page: 'Page',
            auction: 'Auction',
            theme: 'Theme',
            menu: 'Menu',
            blog: 'Blog',
            creator: 'Creator',
            analytics: 'Analytics',
            preferance: 'Preferance',
            appConfig: 'App-Config',
            moralis: 'Moralis',
            transakOrder: 'Transak-order',
            offer: 'Make-An-Offer'
        },
        methods: {
            post: 'post',
            get: 'get',
            patch: 'patch',
            delete: 'delete',
            put: 'put',
        },
    },

    UPLOAD: {
        profileImage: {
            fileTypes: /jpeg|png|jpg/,
            maxSize: 15728640, // 15 MB
            defaultImage: 'https://nft-two.s3.amazonaws.com/theme/91b14c26-648a-4902-8acc-e216c2765aa9.png',
        },
        profileBannerImage: {
            fileTypes: /jpeg|png|jpg/,
            maxSize: 15728640, // 15 MB
        },
        collectionImage: {
            fileTypes: /jpeg|png|jpg/,
            maxSize: 15728640, // 15 MB
        },
        collectionBannerImage: {
            fileTypes: /jpeg|png|jpg/,
            maxSize: 15728640, // 15 MB
        },
        assetImage: {
            fileTypes: /jpeg|png|jpg|mp4|webp|mpeg|mp3|ogg|wav|gltf|gif|obj|fbx|ply|application\/octet-stream/,
            maxSize: 157286400, // 150 MB
            defaultImage: 'https://nft-two.s3.amazonaws.com/theme/785a1141-edf6-4c00-9543-f76d3a0aca14.png',
        },
        assetSupportImage: {
            fileTypes: /jpeg|png|jpg/,
            maxSize: 15728640, // 15 MB
        },
        categoryBannerImage: {
            fileTypes: /jpeg|png|jpg/,
            maxSize: 15728640, // 15 MB
        },
        folders: {
            profile: 'profile',
            collection: 'collection',
            assets: 'assets',
            category: 'category',
            categoryBanner: 'categoryBanner',
            supportersLogo: 'supportersLogo',
            blog: 'blog',
            theme: 'theme',
        },
        categoryImage: {
            fileTypes: /jpeg|png|jpg/,
            maxSize: 15728640, // 15 MB
        },
        supportersLogo: {
            fileTypes: /jpeg|png|jpg/,
            maxSize: 15728640, // 15 MB,
            supporters: 'supporters',
        },
        blogImage: {
            fileTypes: /jpeg|png|jpg/,
            maxSize: 15728640, // 15 MB
        },
        themeImage: {
            fileTypes: /jpeg|png|jpg|ico/,
            maxSize: 15728640, // 15 MB
        },
        logo: {
            fileTypes: /jpeg|png|jpg/,
            maxSize: 15728640, // 15 MB
            defaultImage: 'https://api-s3-nft.avis.exchange/avis/theme/1305c9aa-36df-4869-a4bd-8b0d4d738d07.png',
        },
    },

    USER: {
        roles: {
            user: 'user',
            artist: 'artist',
            admin: 'admin',
            creator: 'creator',
        },
        validationTypes: {
            profile: 'profile',
            emailVerified: 'emailVerified',
        },
    },

    PAGINATION: {
        orderBy: {
            ascending: 'ASC',
            descending: 'DESC',
        },
        items: 10,
        page: 1,
    },

    TEST: {
        WALLET_ADDRESS: process.env.WALLET_ADDRESS,
        SIGNATURE: process.env.SIGNATURE,
    },
    PINATA: {
        API_KEY: process.env.PINATA_API_KEY,
        SECRET_KEY: process.env.PINATA_SECRET_KEY,
    },
    BLOCKCHAIN: {
        CHAIN: process.env.CHAIN,
        NETWORK: process.env.NETWORK,
        ADMIN: {
            ETH: process.env.ETHEREUM_ADMIN_ADDRESS,
        },
        GAS_ADD_ON: {
            ETH: 10000000000,
        },
        RPC_URLS: {
            ETH: {
                mainnet: process.env.ETHEREUM_RPC_URL,
                rinkeby: process.env.RINKEBY_RPC_URL,
                ropsten: process.env.ROPSTEN_RPC_URL,
                goerli: process.env.GOERLI_RPC_URL,
                development: process.env.DEV_RPC_URL || 'http://127.0.0.1:7545',
                polygonMumbai: process.env.POLYGON_MUMBAI_RPC_URL || 'http://127.0.0.1:7545',
                polygon: process.env.POLYGON_RPC_URL || 'http://127.0.0.1:7545',
            },
        },
        CONTRACTS: {
            PRIMARY: {
                FIXED_PRICE: {
                    ETH: {
                        mainnet: process.env.ETHEREUM_PRIMARY_FIXED_PRICE_CONTRACT_ADDRESS,
                        goerli: process.env.GOERLI_PRIMARY_FIXED_PRICE_CONTRACT_ADDRESS,
                        development: process.env.DEV_PRIMARY_FIXED_PRICE_CONTRACT_ADDRESS,
                        polygonMumbai: process.env.POLYGON_MUMBAI_PRIMARY_FIXED_PRICE_CONTRACT_ADDRESS,
                        polygon: process.env.POLYGON_PRIMARY_FIXED_PRICE_CONTRACT_ADDRESS,
                    },
                },
                AUCTION: {
                    ETH: {
                        mainnet: process.env.ETHEREUM_PRIMARY_AUCTION_CONTRACT_ADDRESS,
                        goerli: process.env.GOERLI_PRIMARY_AUCTION_CONTRACT_ADDRESS,
                        development: process.env.DEV_PRIMARY_AUCTION_CONTRACT_ADDRESS,
                        polygonMumbai: process.env.POLYGON_MUMBAI_PRIMARY_AUCTION_CONTRACT_ADDRESS,
                        polygon: process.env.POLYGON_PRIMARY_AUCTION_CONTRACT_ADDRESS,
                    },
                },
            },
            SECONDARY: {
                ETH: {
                    mainnet: process.env.ETHEREUM_SECONDARY_CONTRACT_ADDRESS,
                    goerli: process.env.GOERLI_SECONDARY_CONTRACT_ADDRESS,
                    development: process.env.DEV_SECONDARY_CONTRACT_ADDRESS,
                    polygonMumbai: process.env.POLYGON_MUMBAI_SECONDARY_CONTRACT_ADDRESS,
                    polygon: process.env.POLYGON_SECONDARY_CONTRACT_ADDRESS,
                },
            },
            NFT: {
                ETH: {
                    mainnet: process.env.ETHEREUM_NFT_ADDRESS,
                    goerli: process.env.GOERLI_NFT_ADDRESS,
                    development: process.env.DEV_NFT_ADDRESS,
                    polygonMumbai: process.env.POLYGON_MUMBAI_NFT_ADDRESS,
                    polygon: process.env.POLYGON_NFT_ADDRESS,
                },
            },
        },
        DEFENDER: {
            ETH: {
                mainnet: {
                    API_KEY: process.env.ETHEREUM_API_KEY,
                    API_SECRET: process.env.ETHEREUM_API_SECRET,
                },
                goerli: {
                    API_KEY: process.env.GOERLI_API_KEY,
                    API_SECRET: process.env.GOERLI_API_SECRET,
                },
                development: {
                    API_KEY: process.env.DEV_API_KEY,
                    API_SECRET: process.env.DEV_API_SECRET,
                },
                polygonMumbai: {
                    API_KEY: process.env.POLYGON_MUMBAI_API_KEY,
                    API_SECRET: process.env.POLYGON_MUMBAI_API_SECRET,
                },
                polygon: {
                    API_KEY: process.env.POLYGON_API_KEY,
                    API_SECRET: process.env.POLYGON_API_SECRET,
                },
            },
        },
        SALE_CATEGORY: {
            PRIMARY: 'PRIMARY',
            SECONDARY: 'SECONDARY',
        },
        SALE_TYPE: {
            FIXED_PRICE: 1,
            AUCTION: 2,
        },
        SALE_TYPE_LABEL: {
            FIXED_PRICE: 'FIXED_PRICE',
            AUCTION: 'AUCTION',
        },
        MINTING: {
            ERC20_TOKEN: process.env.ZERO_ADDRESS,
            ROYALTY_RECEIVER_ADDRESS: process.env.ZERO_ADDRESS,
        },
        AUCTION: {
            ETH: {
                PRIMARY_SELLER: {
                    mainnet: process.env.ETHEREUM_AUCTION_PRIMARY_SELLER,
                    goerli: process.env.GOERLI_AUCTION_PRIMARY_SELLER,
                    development: process.env.DEV_SAUCTION_PRIMARY_SELLER,
                    polygonMumbai: process.env.POLYGON_MUMBAI_AUCTION_PRIMARY_SELLER,
                    polygon: process.env.POLYGON_AUCTION_PRIMARY_SELLER,
                },
            },
        },
        NFT_DETAILS: {
            ETH: {
                ropsten: {
                    NFT_TOKEN_STD: 'ERC721',
                    metadata: 'centralized',
                    blockchain_Label: 'Ethereum',
                    network_Label: 'Ropsten',
                },
                goerli: {
                    NFT_TOKEN_STD: 'ERC721',
                    metadata: 'centralized',
                    blockchain_Label: 'Ethereum',
                    network_Label: 'Goerli',
                },
                polygon: {
                    NFT_TOKEN_STD: 'ERC721',
                    metadata: 'centralized',
                    blockchain_Label: 'Polygon',
                    network_Label: 'Matic',
                },
                polygonMumbai: {
                    NFT_TOKEN_STD: 'ERC721',
                    metadata: 'centralized',
                    blockchain_Label: 'Polygon',
                    network_Label: 'Matic',
                },
            },
        },
    },

    TESTCASE: {
        adminAccessToken: '',
        userAccessToken: '',
        userId: '',
    },
    EDITION_CONDITION: {
        featuedAsset: 'featuredAsset',
        homeScreenAsset: 'homeScreenAsset',
        status: {
            pending: 'pending',
            success: 'success',
            onSale: 'onSale',
            active: 'active',
        },
    },

    AUCTION_CONDITION: {
        status: {
            expired: 'expired',
            ended: 'ended',
            live: 'live',
            confirmed: 'confirmed',
            pending: 'pending',
        },
    },

    CRYPTO_COMPARE: {
        api_key: process.env.CRYPTO_COMPARE_API_KEY,
        exchange_rate_url: process.env.EXCHANGE_RATE_URL,
    },

    GLOBAL_CURRENCY: {
        crypto: process.env.GLOBAL_CRYPTO,
        currency: process.env.GLOBAL_CURRENCY,
        type: {
            baseCurrency: 'BASE_CURRENCY',
            supportingCurrency: 'SUPPORTING_CURRENCY',
        },
        currencyType: {
            fiat: 'FIAT',
            crypto: 'CRYPTO',
        },
    },

    MORALIS: {
        serverUrl: process.env.MORALIS_URL,
        appId: process.env.MORALIS_APPID,
        masterKey: process.env.MORALIS_MKEY,
        apiKey: process.env.MORALIS_API_KEY,
        api_base_url: 'https://deep-index.moralis.io/api/',
    },

    TRANSACTIONS: {
        type: {
            inbound: 'inbound',
            outbound: 'outbound',
            all: 'all',
        },
        eventTypes: {
            buy: 'buyNFT',
            listResale: 'listResale',
            listAuction: 'listAuction',
            listResaleAuction: 'listResaleAuction',
            cancelPrimaryAuction: 'cancelPrimaryAuction',
            cancelResale: 'cancelResale',
            transferNft: 'transferNFT',
            bid: 'bid',
            settleAuction: 'settleAuction',
            platformFee: 'platform_fee',
            platformFeeUpdate: 'platform_fee_update',
            royalty: 'royalty',
            fiatPurchase: 'fiatPurchase',
            auctionSale: 'auctionSale',
            payOut: 'payOut',
        },
        PLATFORM_FEE: '5',
    },

    ACTIVITY_LOG: {
        activity: {
            buyNFT: 'buyNFT',
            buyNFTAuction: 'buyNFTAuction',
            soldNFT: 'soldNFT',
            likeNFT: 'likeNFT',
            listResale: 'listResale',
            cancelSale: 'cancelSale',
            cancelBuyNFT: 'cancelBuyNFT',
            bid: 'bid',
            madeAnOffer: 'madeAnOffer',
            cancelAnOffer: 'cancelAnOffer'

        },
    },

    AUCTION: {
        status: {
            pending: 'pending',
            confirmed: 'confirmed',
            live: 'live',
            cancelled: 'cancelled',
            ended: 'ended',
        },
    },

    MAIL_GATEWAY: {
        FROM_MAIL: process.env.FROM_MAIL || 'noreply@nft2.0.com',
        DEFAULT_MAIL_PROVIDER: 'SENDGRID',
        SENDGRID: {
            apiKey: process.env.SENDGRID_API_KEY,
        },
    },

    CREATOR_REQUEST: {
        pending: 'pending',
        approved: 'approved',
        declined: 'declined',
        CREATOR_REQUEST_INTERVAL: process.env.CREATOR_REQUEST_INTERVAL,
    },

    SALE_TYPES: {
        types: {
            fixed: 'fixed',
            auction: 'auction',
        },
        allowedKeys: ['fixed', 'auction'],
    },

    PREFERANCES: {
        allowedKeys: ['meta_title', 'meta_description', 'zendesk_support', 'google_analytics'],
    },

    APP_CONFIG: {
        types: {
            admin: 'admin',
            user: 'user',
            common: 'common',
        },
    },
    EMAIL_VERIFICATION: process.env.EMAIL_VERIFICATION || false,

    TRANSAK: {
        TRANSAK_ACCESS_TOKEN: process.env.TRANSAK_ACCESS_TOKEN,
        TRANSAK_API_KEY: process.env.TRANSAK_API_KEY,
        TRANSAK_API_SECRET: process.env.TRANSAK_API_SECRET,
        TRANSAK_URL: process.env.TRANSAK_API_URL,
        EVENTS: {
            ORDER_FAILED: 'ORDER_FAILED',
            ORDER_COMPLETED: 'ORDER_COMPLETED',
            ORDER_PROCESSING: 'ORDER_PROCESSING'
        },
        STATUS: {
            CANCELLED: 'CANCELLED',
            COMPLETED: 'CANCELLED',
            EXPIRED: 'EXPIRED'
        }
    },

    FILE_UPLOAD: {
        service: process.env.STORAGE_SERVICE || 's3',
        supportedServices: {
            s3: 's3',
            minio: 'minio',
        },
    },

    MINIO: {
        minioEndpoint: process.env.MINIO_ENDPOINT,
    },

    OFFER: {
        status: {
            pending: 'pending',
            approved: 'approved',
            declined: 'declined',
            cancelled: 'cancelled',
            expired: 'expired',
        },
    },
};
