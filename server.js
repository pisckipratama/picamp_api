const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// load env vars, initial app, and connect to DB
dotenv.config({ path: "./config/config.env" });
const app = express();
connectDB();

// routes file
const bootcampRoutes = require('./routes/bootcamps');

// dev logging middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// mount routes
app.use('/api/v1/bootcamps', bootcampRoutes);

app.use(errorHandler);

// server initial
const PORT = process.env.PORT || 1337;
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold));

// handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);

  // close server & exit process
  server.close(() => process.exit(1));
});