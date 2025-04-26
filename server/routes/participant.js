const express = require("express");
const router = express.Router();
const Participant = require("../models/participant");

router.post(
  "/participant",
  async (req, res) => {
    try {
      
      let participant = await Participant.create({
        eventTitle:req.body.eventTitle,
        name: req.body.name,
        email: req.body.email,
        phoneNumber:req.body.phoneNumber,
        payment:req.body.success
      });
      return res.send("participant registered successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);
router.get("/getparticipant", async (req, res) => {
  try {
    const participant = await Participant.findOne({
      eventTitle
  });
    res.send(participant);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});

module.exports = router;
