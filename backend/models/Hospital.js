const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  username: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String },
  resetOTP: { type: String },
  resetOTPExpiry: { type: Date },
  isApproved: { type: Boolean, default: false },
  name: String,
  location: String,
  contactNumber: String,

  coordinates: {
    lat: Number,
    lng: Number
  },

  emergency: Boolean,
  facilities: {
    oxygen: Boolean,
    icuBeds: Number,
    ventilator: Boolean,
    ambulance: Boolean
  },
  
  bloodBank: {
    A_pos: { type: Boolean, default: false },
    A_neg: { type: Boolean, default: false },
    B_pos: { type: Boolean, default: false },
    B_neg: { type: Boolean, default: false },
    O_pos: { type: Boolean, default: false },
    O_neg: { type: Boolean, default: false },
    AB_pos: { type: Boolean, default: false },
    AB_neg: { type: Boolean, default: false }
  }
});

module.exports = mongoose.model("Hospital", hospitalSchema);