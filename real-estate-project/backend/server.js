require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const pool = require('./config/db');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors'); 
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;

pool.connect();

app.use(express.json());
app.use(cors());

app.use(session({
  secret: process.env.GOOGLE_CLIENT_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => res.send('Welcome to the Real Estate App Backend'));
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
