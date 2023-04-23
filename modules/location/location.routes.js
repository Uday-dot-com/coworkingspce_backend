const express = require("express");
const {
  verifySignature,
  validationMiddleware,
  authMiddleware,
  uploadMulterMiddleware,
  roleVerificationMiddleware,
  rateLimiter,
} = require("../../middlewares");
const {
  locationCreateSchema,
  getAllLocationsSchema,
  getLocationSchema,
  updateLocationSchema,
} = require("../../modules/location/locations.validations");
const locationController = require("./location.controller");

const router = express.Router();

router.post(
  "/create",
  validationMiddleware(locationCreateSchema),
  locationController.locationCreate
);

router.get(
  "/",
  validationMiddleware(getAllLocationsSchema),
  locationController.getAllLocations
);

router.get(
  "/:id",
  validationMiddleware(getLocationSchema),
  locationController.getLocation
);

router.delete(
  "/delete/:id",
  validationMiddleware(getLocationSchema),
  locationController.deleteLocation
);

router.patch(
  "/update/:id",
  validationMiddleware(updateLocationSchema),
  locationController.updateLocationById
);

module.exports = router;
