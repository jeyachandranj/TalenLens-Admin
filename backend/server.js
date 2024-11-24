const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const connectDB = require('./config/db');
const cors = require("cors");

const app = express();

app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
