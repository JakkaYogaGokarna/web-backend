// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Appointment = require('./models/Appointment');
const User = require('./models/User');

// Load .env config
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'balappa'
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
// 🟢 Appointment Booking
app.post('/api/appointments', async (req, res) => {
  try {
    const { name, email, phone, date, time, message, token } = req.body;
    const newAppointment = new Appointment({ name, email, phone, date, time, message, token });
    await newAppointment.save();
    res.status(200).json({ message: "✅ Appointment saved successfully" });
  } catch (error) {
    console.error("❌ Error saving appointment:", error);
    res.status(500).json({ message: "❌ Failed to save appointment" });
  }
});

// 🟢 User Signup
app.post('/api/signup', async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "❌ Email already registered" });

    const newUser = new User({ name, email, phone, password });
    await newUser.save();
    res.status(200).json({ message: "✅ Signup successful" });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ message: "❌ Failed to register user" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

