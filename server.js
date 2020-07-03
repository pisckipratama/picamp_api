const express = require('express');
const dotenv = require('dotenv');

// load env vars
dotenv.config({ path: "./config/config.env" });

// initial app
const app = express();

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));