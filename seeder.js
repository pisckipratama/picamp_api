const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// load env
dotenv.config({ path: './config/config.env' });

// load models
const Bootcamp = require('./models/Bootcamp');

// connection mongodb
mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});

// read json file
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

// import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log("data imported...".green);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// destroy into DB
const destroyData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log("data destroyed...".red);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// conditional option
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  destroyData();
}