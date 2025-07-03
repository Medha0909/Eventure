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
        phoneNumber:req.body.phoneno,
        payment:req.body.success
      });
      return res.send("participant registered successfully");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);

router.get("/getparticipant/:title", async (req, res) => {
  try {
    const title=req.params.title
    let participants = await Participant.find(
  { eventTitle: title}
  );
  if (participants.length > 0) {
    res.status(200).send(participants);
  } else {
    res.status(200).send([]);
  }
} catch (error) {
  console.error(error.message);
  res.status(500).send("internal server error");
}
});


module.exports = router;