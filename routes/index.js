const express = require("express");

const router = express.Router();

const { userRoutes } = require("../modules/user");
const { adminRoutes } = require("../modules/admin");
const { locationRoutes } = require("../modules/location");
const { officeRoutes } = require("../modules/office");
//const { CONSTANTS } = require("../configs");
const { version } = require("../package.json");
// eslint-disable-next-line no-unused-vars
router.get("/", (req, res) => {
  res.send(`API Endpoint is working. Version - ${version}`);
});

// Main Routes
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/location", locationRoutes);
router.use("/office", officeRoutes);

module.exports = router;
