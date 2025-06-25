// models/Appointment.js

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  date: String,
  time: String,
  message: String,
  token: String
});

module.exports = mongoose.model('Appointment', appointmentSchema);
