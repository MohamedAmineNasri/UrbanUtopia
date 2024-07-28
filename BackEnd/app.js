const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config({ path: './.env' });
const mongoose = require('./server'); // Import the connection from server.js

require('./passport'); // Import Passport configuration here

const app = express();


// Middleware setup
app.use(
  session({
    secret: 'UrbanUtopia', // Change to secure random strings in production
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
    })
    )
    
app.use(cors({
  origin: 'http://localhost:5173',
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

      
// Routes setup
app.use('/auth', require('./routes/authRoutes'));
app.use('/properties', require('./Routes/propertyRoutes'));

// Start server only after MongoDB connection is established
mongoose.connection.once('open', () => {
  console.log('MongoDB Connected!');

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = app;
