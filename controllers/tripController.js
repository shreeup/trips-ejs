const Trip = require("../models/Trip");
const getallTrips = async (req, res) => {
  const trips = await Trip.find({ commuter: req.user._id }).sort("createdAt");
  //res.status(StatusCodes.OK).json({ trips, count: trips.length });
  res.render("trips", { trips });
};

const geteditTrip = async (req, res) => {
  const {
    user: { _id: userId },
    params: { id: tripId },
  } = req;
  const trip = await Trip.findOne({ _id: tripId, commuter: userId });

  if (!trip) {
    throw new NotFoundError(` No trip with id ${tripId}`);
  }
  //res.status(StatusCodes.OK).json({ trip });
  return res.render("trip", {
    trip,
    tripdatetext: new Date(trip.date).toISOString().slice(0, 10),
  });
};

const addTrip = async (req, res) => {
  req.body.commuter = req.user._id;
  try {
    const trip = await Trip.create(req.body);
    console.log(trip);
    //res.status(StatusCodes.CREATED).json({ trip });
    return res.redirect("/trips");
  } catch (e) {
    console.log(e);
  }
};

const editTrip = async (req, res) => {
  const {
    body: { to, from },
    user: { _id: userId },
    params: { id: tripId },
  } = req;
  if (!to || !from) {
    throw new BadRequestError("To / From cannot be empty");
  }
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: tripId, commuter: userId },
      { date: req.body.date, to: req.body.to, from: req.body.from },
      { new: true, runValidators: true }
    );

    if (!trip) {
      throw new NotFoundError(` No trip with id ${tripId}`);
    }
    //res.status(StatusCodes.OK).json({ trip });
    return res.redirect("/trips");
  } catch (e) {
    console.log(e);
  }
};
const deleteTrip = async (req, res) => {
  //res.send("delete Trips");
  const {
    user: { _id: userId },
    params: { id: tripId },
  } = req;
  try {
    const trip = await Trip.findByIdAndDelete(tripId);
    if (!trip) {
      throw new NotFoundError(` No trip with id ${tripId}`);
    }
    //res.status(StatusCodes.OK).json({ msg: "The entry was deleted." });
    return res.redirect("/trips");
  } catch (e) {
    console.log(e);
  }
};

const getnewTrip = (req, res) => {
  if (req.user) {
    //csrf.refresh(req, res);
    //return res.redirect("/");
    return res.render("trip", { trip: null });
  }
  return res.redirect("/");
};

module.exports = {
  getallTrips,
  addTrip,
  getnewTrip,
  geteditTrip,
  editTrip,
  deleteTrip,
};
