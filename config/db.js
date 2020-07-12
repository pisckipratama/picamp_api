const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/devcamper';

const connectDB = async () => {
  const conn = await mongoose.connect(uri, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  });

  console.log(`MongoDB connected: ${conn.connection.host}`.cyan);
};

module.exports = connectDB;