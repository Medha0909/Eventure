const express = require("express");
const router = express.Router();
const Event = require("../models/event");

router.post(
  "/eventroute",
  //[
  //body('email','Enter a valid email').isEmail(),
  // body('password','Password must be atleast 5 character').isLength({min:5}),
  //],
  async (req, res) => {
    //let success = false;
    //If there are errors return bad rquest and the errors
    //const errors = validationResult(req);
    //if (!errors.isEmpty()) {
    // return res.status(400).json({ success, errors: errors.array() });
    //}
    //check whether the user with this email already exists
    try {
      //let event = await Event.findOne({ email: req.body.email });
      //if (event) {
      //return res
      //.status(400)
      //.json({

      //  error: "Sorry a user with this email already exists",
      //  });
      //}
      //else{
      let event = await Event.create({
        name: req.body.name,
        email: req.body.email,
        eventType: req.body.eventType,
        country1: req.body.country1,
        city: req.body.city,
        place: req.body.place,
        eventTitle: req.body.eventTitle,
        regFees: req.body.regFees,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        numPeople: req.body.numPeople,
      });
      return res.send("event scheduled successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);
router.get("/getapi", async (req, res) => {
  try {
    const event = await Event.find();
    res.send(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});

module.exports = router;
