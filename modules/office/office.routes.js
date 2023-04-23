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
  officeCreateSchema,
  getAllOfficeSchema,
  getOfficeSchema,
  updateLocationSchema,
} = require("../../modules/office/office.validations");
const officeController = require("./office.controller");

const router = express.Router();

router.post(
  "/create",
  validationMiddleware(officeCreateSchema),
  officeController.officeCreate
);

router.get(
  "/",
  validationMiddleware(getAllOfficeSchema),
  officeController.getAllOffices
);

router.get(
  "/:id",
  validationMiddleware(getOfficeSchema),
  officeController.getOffice
);

// router.delete(
//   "/delete/:id",
//   validationMiddleware(getLocationSchema),
//   locationController.deleteLocation
// );

// router.patch(
//   "/update/:id",
//   validationMiddleware(updateLocationSchema),
//   locationController.updateLocationById
// );

module.exports = router;
