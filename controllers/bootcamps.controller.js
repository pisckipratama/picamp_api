/**
 * @desc    Get All Bootcamps
 * @route   GET /api/v1/bootcamps
 * @access  Public
 */
const getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, message: "show all bootcamps" });
};

/**
 * @desc    Get Bootcamp 
 * @route   GET /api/v1/bootcamps/:id
 * @access  Public
 */
const getSingleBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, message: `show bootcamps ${req.params.id}` });
};

/**
 * @desc    Create Bootcamp 
 * @route   POST /api/v1/bootcamps
 * @access  Public
 */
const createBootcamp = (req, res, next) => {
  res.status(201).json({ success: true, message: "create bootcamp" });
};

/**
 * @desc    Update Bootcamp 
 * @route   PUT /api/v1/bootcamps
 * @access  Public
 */
const updateBootcamp = (req, res, next) => {
  res.json({ success: true, message: `update bootcamps ${req.params.id}` });
};

/**
 * @desc    Delete Bootcamp 
 * @route   DELETE /api/v1/bootcamps
 * @access  Public
 */
const deleteBootcamp = (req, res, next) => {
  res.json({ success: true, message: `delete bootcamps ${req.params.id}` });
};

module.exports = {
  getBootcamps,
  getSingleBootcamp,
  updateBootcamp,
  createBootcamp,
  deleteBootcamp
};