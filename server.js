const express = require('express');
const dotenv = require('dotenv');

// load env vars
dotenv.config({ path: "./config/config.env" });

// routes file
const bootcampRoutes = require('./routes/bootcamps');

// initial app
const app = express();

// mount routes
app.use('/api/v1/bootcamps', bootcampRoutes);

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));