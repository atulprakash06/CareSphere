const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetOTP: { type: String },
  resetOTPExpiry: { type: Date },
  
  // Medical Profile Fields
  name: { type: String, default: "" },
  age: { type: String, default: "" },
  gender: { type: String, default: "" },
  bloodGroup: { type: String, default: "" },
  allergies: { type: String, default: "" },
  chronicConditions: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
