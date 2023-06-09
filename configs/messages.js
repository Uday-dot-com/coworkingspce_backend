module.exports = {
  APP: {
    serverError: "Something went wrong!",
  },

  MIDDLEWARE: {
    verifySignature: {
      invalidSignature: "Invalid signature!",
    },
    authorization: {
      missingHeader: "Missing authorization header!",
      missingToken: "Missing access token!",
      accessDenied: "Invalid access token!",
      roleMismatch: "Role mismatch!",
    },
    upload: {
      fileLimitExceeded: "File limit exceeded!",
      fileTypeNotAllowed: "File type not allowed!",
      fileSizeExceeded: "File size exceeded!",
    },
    userProfile: {
      profileIncomplete: "Please update your profile and try again!",
      userNotFound: "User details not found!",
      emailNotVerfied: "Please verify your email and try again!",
      socialMediaLinkNotAdded:
        "Please add any of the social media links in your profile and try again!",
    },
  },

  JWT: {
    invalidToken: "Invalid token!",
    invalidTokenSource: "Invalid token source!",
  },

  USER: {
    blocked: "Account is blocked!",
    blockedState: "User profile already exist with blocked state",
    walledExist: "Wallet address matched profile already exist",
    notFound: "User not found!",
    walletConnected: "Wallet connected successfully",
    profileUpdated: "Profile updated successfully",
    getProfile: "Profile fetched successfully",
    profileImageUpload: "Profile image uploaded sucessfully",
    removedProfileImage: "Profile image removed successfully",
    invalidProfileImage: "Invalid image! Only support jpeg|jpg|png extensions",
    fileValueMissed: "Missing uploading file",
    profileBannerImageUpload: "Profile banner image uploaded sucessfully",
    removedBannerProfileImage: "Profile banner image removed successfully",
    usersFetched: "Users fetched sucessfully",
    isUserEmailExists: "Email ID already exists",
    isUserPhoneExists: "Users Phone number already exists",
    userRoleMismatched: "User role not be admin",
    isUserNameExists: "Users Username already exists",
    refreshToken: "Success",
    userNameValidate:
      "Only letters and number are allowed in user name field,  length should be minimum 4  & maximum 24",
    firstNameValidate:
      "Only letters, numbers and space are allowed in first name field",
    lastNameValidate:
      "Only letters, numbers and space are allowed in last name field",
    emailAlreadyVerified: "Email already verified",
    emailVerified: "Email verified successfully",
    emailVerificationLinkSent: "Email verification link sent successfully",
    forgotPasswordLinkSent: "Forgot password link sent successfully",
    passwordChanged: "Password changed successfully",
    resentEmailLimit:
      "You have exceeded maximum limit, Please try after some time.",
  },

  ADMIN: {
    inactive: "Account is inactive!",
    notFound: "Admin not found!",
    login: "Admin logged in successfully",
    passwordSuccess: "Password checked successfully",
    invalidCredentials: "Invalid email or password",
    invalidConfirmPassword: "Invalid new or confirm password",
    passwordChanged: "Password changed successfully",
    passwordChangeFailed: "Password changes failed",
    credentialsNotFound: "Admin credentials not found in the env file",
    userCreated: "User Profile created successfully",
    userBlocked: "Successfully blocked",
    userUnBlocked: "Successfully unblocked",
    adminProfileUpdated: "Admin Profile updated successfully",
    getAdminProfile: "Profile fetched successfully",
    invalidProfileImage: "Invalid image! Only support jpeg|jpg|png extensions",
    profileImageUpload: "Profile image uploaded sucessfully",
    bannermageAdded: "Banner Image successfully uploaded",
    invalidOTP: "OTP does not match",
    emailNotFound:
      "Could not find any account associated with the email address",
    forgotPassword:
      "You will receive an email with the link to reset the password if the email entered is correct",
    creatorResponseValidation:
      "Only letter, number and space are allowed for response.",
  },

  CATEGORY: {
    categoryCreated: "New category is created",
    categoryUpdate: "Category was updated successfully",
    notFound: "Category not found!",
    categoriesGet: "Categories fetched successfully",
    categorySpecialCharacters:
      "Category name should not contain special characters",
    slugPresent: "Slug is already present, enter a new category name",
    minimunReqirement: "Minimun one field is required for updation",
    categoriesFetched: "Single Category fetched sucessfully",
    imageAdded: "Image for category successfully updated",
    categoryBannermageAdded: "Banner Image for category successfully updated",
    categoryRemoved: "Removed category successfully",
    cannotRemoveCategory: "Cannot remove categories having assets",
  },
  COLLECTION: {
    collectionCreated: "New collection is created",
    collectionUpdate: "Collection was updated successfully",
    notFound: "Collection not found!",
    collectionSpecialCharacters:
      "Collection name should not contain special characters",
    slugPresent: "Slug is already present, enter a new collection name",
    minimunReqirement: "Minimun one field is required for updation",
    collectionGet: "Collection fetched successfully",
    collectionFetched: "Single Collection fetched successfully",
    bannerImageUpdated: "Banner image for collection successfully updated",
    imageUpdated: "Image for collection successfully added",
    collectionRemoved: "Removed collection successfully",
    cannotRemoveCollection: "Cannot remove collections having assets",
    invalidCreator: "Invalid creatorId",
  },
  ASSETS: {
    assetsCreated: "New asset created",
    assetFetchSuccessfully: "Assets fetched successfully",
    addMainAsset: "Uploaded main asset successfully",
    uploadAssetInToPinata: "Uploaded main asset to pinata successfully",
    assetsUpdated: "Asset was updated successfully",
    notFound: "Asset not found!",
    cannotUpdateAsset:
      "Asset updation can't be able to perform because asset sell started",
    notSameTotalEditionCount:
      "Asset updation cannot be performed because totalEdition count differ",
    cannotRemoveAsset:
      "Asset remove can't be able to perform because asset sell started",
    assetsRemoved: "Removed asset successfully",
    assetRemoveMediaFile: "Removed asset media file successfully",
    uploadSupportAsset: "Uploaded support asset successfully",
    invalidFileFormat: "Invalid file format",
    invalidFileType: "Only supports image files with ",
    invalidSaleType: "Invalid sale type",
    noFiles: "Need atleast one file for uploading",
    assetEditionFetchSuccessfully: "Edition fetched successfully",
    editionNotFound: "Edition not found!",
    assetSingleFetchSuccess: "Asset fetched successfully",
    trendingAssetFetch: "Trending Assets fetched successfully",
    assetsOnResale: "Assets on resale fetched successfully",
    updatedEdition: "Updated featured Asset",
    featuredAssetList: "Featured Asset list fetched successfully",
    assetMediaNotFound: "Asset Media File Not found!",
    notSameMainAssetUrl: "Cannot update main asset url",
    notSameMainAssetlpfsUrl:
      "Asset updation cannot be performed because mainAssetlpfsUrl differ",
    notSameMainAssetType:
      "Asset updation cannot be performed because mainAssetType differ",
    auctionStartDateValidation:
      "Auction start date and time should be greater than current date time!",
    auctionEndDateValidation:
      "Auction end date and time should be greater than auction start date and time!",
    assetSaleStatusChange: "Asset sale status changed",
    assetfeatureNotPossible:
      "Cannot change featured status for assets not on sale",
    assetSaleStatusChangeNotPossibleFxd:
      "Cannot change status for sold out asset",
    assetSaleStatusChangeNotPossibleAuc:
      "Cannot change status for expired auction",
    nameLengthError: "Name cannot be greater than 255 character",
    assetUpdateForOutOfStock: "Cannot update sold out asset",
    invalidUpdateRequest: "Update Access Denied",
    invalidImageUrl: "Invalid main asset url",
    invalidCreator: "Invalid creator id",
    auctionDateValidity: "Auction start and end date is mandatory",
  },
  ORDER: {
    notFound: "TokenId not found!",
    soldOut: "NFT sold out",
    mint: "Transaction for buying NFT initiated",
    resale: "NFT added for resale",
    cancel: "Canceling NFT resale",
    buyNFT: "Transaction for buying NFT from sale initiated",
    bid: "Transaction for adding new bid initiated",
    settleAuction: "Transaction for ending auction initiated",
    saleDetails: "Sale details fetched successfully",
    sendTransaction: "Transaction for buy asset successfully completed",
    listTransactions: "Transactions fetched successfully",
    getTransaction: "Transaction details fetched successfully",
    buyFiatNFT: "Transaction for buying NFT from sale Updated",
  },
  COMMON: {
    removeMediaFile: "Image Removed successfully",
    getSetting: "Success",
  },
  CURRENCY: {
    currencyGet: "Currency fetched successfully",
  },
  BLOCKCHAIN: {
    send: "Transaction sent to the blockchain successfully!",
    build: "Transaction built successfully!",
    unknownTxn: "Unknown Transaction!",
  },
  EXCHANGE_RATE: {
    sucess: "Sucessfully fetched current crypto rate",
  },
  DASHBOARD: {
    getDashboard: "Sucessfully fetched dashboard",
    getCharts: "Sucessfully fetched charts",
  },
  FAVORITE: {
    favoriteDataChanged: "Favorite Data Changed",
    getFavorites: "Sucessfully fetched favorites",
  },
  ACTIVTY: {
    getActivity: "Sucessfully fetched the activity log",
  },
  PAGE: {
    pageDataAdded: "Page Data Added",
    getPage: "Sucessfully fetched Page",
    addSupportersLogo: "Succesfully added the supporters logo",
    notFound: "Page not found!",
    getSupporters: "Sucessfully fetched Supporters",
    pageUpdated: "Page Details updated successfully",
    pageRemoved: "Removed Page successfully",
    pageInUse:
      "Page is already used in navigation, please remove it from navigation first",
  },
  FOLLOWS: {
    getFollows: "Sucessfully fetched follower data",
    follow: "Sucessfully followed user",
    unfollow: "Sucessfully unfollowed user",
    followerCount: "Successfully fetched follower count",
  },
  SUBSCRIBER: {
    subscribeNewsLetter: "NewsLetter subscribed",
    subscribeNewsLetterExists: "Already subscribed",
    getAllNewsLetterSubscribes:
      "Sucessfully fetched all News letter subscribers",
  },
  AUCTION: {
    getAuctions: "Sucessfully fetched auctions",
    notFound: "Auction not found",
    bidLower: "Bid amount lower than previous bid",
    auctionNotStarted: "Auction not live",
  },
  THEME: {
    updateTheme: "Theme Data Changed",
    getTheme: "Sucessfully fetched Theme",
    themeImage: "Theme image uploaded sucessfully",
  },
  MENU: {
    createMenu: "Menu Data Added",
    menuTitlePresent: "Title is already present, enter a new menu title",
    updateMenu: "Menu was updated successfully",
    getMenu: "Sucessfully fetched Menu",
    notFound: "Menu not found!",
    menuRemoved: "Removed Menu successfully",
  },
  BLOG: {
    blogSpecialCharacters: "Blog name should not contain special characters",
    blogCreated: "New blog is created",
    slugPresent: "Slug is already present, enter a new blog name",
    notFound: "Blog not found!",
    minimunReqirement: "Minimun one field is required for updation",
    blogsGet: "Blogs fetched successfully",
    blogRemoved: "Removed blog successfully",
    imageAdded: "Image for blog successfully updated",
  },
  MAIL: {
    welcome: "Welcome",
    purchased: "Your order is now complete",
    resale: "Good luck! Your NFT is listed for sale",
    soldOut: "Sold Out",
    applyAsCreator: "Applying to be the creator",
    approved: "your request to be creator is now approved",
    rejected: "you request to be creator is now rejected",
    verifyEmail: "Verify your email",
    forgotPassword: "Reset your password",
    wonAuction: "Auction won",
    failAuction: "Auction failed",
    subscription: "News letter subscription",
    auctionBid: "Auction bid",
    auctionBidOut: "Auction bid Out",
    NFTBlocked: "NFT blocked",
    NFTListed: "NFT listed successfully",
    NFTAccepted: "NFT accepted by Admin",
    removeSale: "NFT removed from sale",
    NFTRejected: "NFT rejected",
    blockUser: "Account is blocked",
    unblockUser: "Account is unblocked",
    applyAsCreatorToAdmin: "New creator request received",
  },
  CREATOR: {
    applied: "You have successfully applied",
    notFound: "Creator request is not found!",
    response: "Request response updated successfully",
    request: "You have already applied",
    getRequest: "Requests fetched successfully",
    userRequest: "your Requests fetched successfully",
    getCreators: "Sucessfully fetched all creators",
    invalidReqInterval: "Invalid creator request interval",
    pendingRequest: "Creator Request is already in pending state",
    blockedUserRole: "Cannnot approve creator request for blocked user",
  },
  ANALYTICS: {
    visitorCount: "Visitor count fetched successfully",
    register: "Visitor registered successfully",
  },
  ACCOUNTING: {
    getFee: "Sucessfully fetched platfrom fee/s",
    updateFee: "Sucessfully updated platform fee",
  },
  PREFERANCE: {
    addPreferance: "Preferance added successfully",
    keyExist: "Preferance key already exist",
    getPreferance: "Preferance settings fetched successfully",
    updatePreferance: "Preferance settings updated successfully",
    invalidId: "Invalid Id",
    deletePreferance: "Preferance deleted successfully",
  },
  APP_CONFIG: {
    getAppConfig: "Config fetched successfully",
  },
  OFFER: {
    offerEndTime: "Offer end time should be greater than current time",
    addOffer: "Offer added successfully",
    offerExist: "Offer already exist",
    offerNotExist: "Offer does not exist",
    getOffers: "Offer details fetched successfully",
    cancelOffer: "Offer cancelled successfully",
    cannotCancel: "Cannot cancel this offer",
    offerNotBelongsToUser:
      "Cannot cancel this offer, Offer does not belongs to you",
    approveOffer: "Offer approved successfully",
  },
  TRANSAK: {
    refreshKey: "Refreshed access key",
    updateHook: "Webhook url updated",
  },
  LOCATION: {
    locationCreated: "location created",
    alllocationsFetched: "All Locations Fetched",
    locationFetched: "Location fetched sucessfully",
    locationRemoved: "Location removed Sucessfully",
    locationNotFound: "Location not found",
    locationUpdated: "Location updated Sucessfully",
  },
};
