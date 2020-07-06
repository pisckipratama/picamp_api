const NodeGeoCoder = require('node-geocoder');

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  fomatter: null
};

const geocoder = NodeGeoCoder(options);

module.exports = geocoder;