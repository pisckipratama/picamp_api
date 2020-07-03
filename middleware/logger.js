const logger = (req, res, next) => {
  console.log(`${req.method} \t ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
};

module.exports = logger;