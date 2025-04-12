const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb://localhost:27017/letsPackBags', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));


const User = require('./models/User');
const Feedback = require('./models/Feedback');

app.post('/api/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) return res.json({ success: true, userId: user._id });
  res.status(401).json({ success: false, message: 'Invalid credentials' });
});


app.post('/api/feedback', async (req, res) => {
  try {
    const fb = new Feedback(req.body);
    await fb.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));