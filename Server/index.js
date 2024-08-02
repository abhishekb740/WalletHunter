const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { config } = require('dotenv');
config();

const app = express();
app.use(cors(
  {
    origin: [
        "http://localhost:5173",
        "https://wallet-hunter-rosy.vercel.app"
    ],
    methods: ["POST", "GET", "HEAD", "PUT", "DELETE", "PATCH"],
    credentials: true,
}
));
app.use(express.json());

const connect = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

const userSchema = new mongoose.Schema({
  username: String,
  messages: Number,
  lastActive: Date,
});

const User = mongoose.model('User', userSchema);

const generateMockData = async () => {
  const users = [];
  for (let i = 1; i <= 100; i++) {
    users.push({
      username: `user${i}`,
      messages: Math.floor(Math.random() * 100),
      lastActive: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
    });
  }
  await User.insertMany(users);
};

app.get('/api/simulate-data', async (req, res) => {
  await generateMockData();
  res.json({ message: 'Data simulated successfully' });
});

app.get('/api/total-members', async (req, res) => {
  const totalMembers = await User.countDocuments();
  res.json({ totalMembers });
});

app.get('/api/growth-rate', async (req, res) => {
  const totalMembers = await User.countDocuments();
  const growthRate = totalMembers / 100;
  res.json({ growthRate });
});

app.get('/api/engagement-rate', async (req, res) => {
  const messagesPerDay = await User.aggregate([
    { $group: { _id: { $dayOfYear: "$lastActive" }, totalMessages: { $sum: "$messages" } } }
  ]);
  res.json({ messagesPerDay });
});

app.get('/api/active-vs-inactive', async (req, res) => {
  const activeMembers = await User.countDocuments({ lastActive: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } });
  const inactiveMembers = await User.countDocuments({ lastActive: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } });
  res.json({ activeMembers, inactiveMembers });
});

app.get('/api/top-contributors', async (req, res) => {
  const topContributors = await User.find().sort({ messages: -1 }).limit(10);
  res.json({ topContributors });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connect();
  console.log(`Server running on port ${PORT}`);
});
