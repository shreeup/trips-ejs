const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  getallTrips,
  addTrip,
  getnewTrip,
  geteditTrip,
  editTrip,
  deleteTrip,
} = require("../controllers/tripController.js");

router.route("/trips").get(getallTrips).post(addTrip);
router.route("/trips/new").get(getnewTrip);
router.route("/trips/edit/:id").get(geteditTrip);
router.route("/trips/update/:id").post(editTrip);
router.route("/trips/delete/:id").post(deleteTrip);
module.exports = router;
