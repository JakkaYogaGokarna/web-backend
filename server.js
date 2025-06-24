const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Appointment = require('./models/Appointment');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const mongoURI = process.env.MONGO_URI;

console.log("Connecting using URI:", mongoURI);

mongoose.connect(mongoURI, {
  dbName: 'balappa'
})
.then(() => {
  console.log('✅ Connected to MongoDB');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
