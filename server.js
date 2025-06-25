// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Appointment = require('./models/Appointment');

// Load environment variables
dotenv.config();

// Create app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'balappa',
})
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// Routes
app.post('/api/appointments', async (req, res) => {
  try {
    const { name, email, phone, date, time, message, token } = req.body;

    const newAppointment = new Appointment({
      name,
      email,
      phone,
      date,
      time,
      message,
      token
    });

    await newAppointment.save();

    res.status(200).json({ message: "✅ Appointment saved successfully" });
  } catch (error) {
    console.error("❌ Error saving appointment:", error);
    res.status(500).json({ message: "❌ Failed to save appointment" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
