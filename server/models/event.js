const { Result } = require("express-validator");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  country1: {
    type: String,
    required: true,
  },city: {
    type: String,
    required: true,
  },place: {
    type: String,
    required: true,
  },
  eventTitle: {
    type: String,
    required: true,
  },
  regFees: {
    type: Number,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  numPeople: {
    type: Number,
    required: true,
  },
});
const Event = mongoose.model("event", eventSchema);
module.exports = Event;
