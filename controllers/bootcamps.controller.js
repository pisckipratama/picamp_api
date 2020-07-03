const Bootcamp = require('../models/Bootcamp');

/**
 * @desc    Get All Bootcamps
 * @route   GET /api/v1/bootcamps
 * @access  Public
 */
const getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({ success: true, message: "show all bootcamps", data: bootcamps });
  } catch (error) {
    console.error(`Error: ${error.message}`.red);
    res.status(400).json({ success: false, message: error.message, data: null });
  }
};

/**
 * @desc    Get Bootcamp 
 * @route   GET /api/v1/bootcamps/:id
 * @access  Public
 */
const getSingleBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) return res.status(404).json({ success: false, message: `data ${req.params.id} not found`, data: bootcamp });
    res.status(200).json({ success: true, message: `show bootcamps ${req.params.id}`, data: bootcamp });
  } catch (error) {
    console.error(`Error: ${error.message}`.red);
    res.status(400).json({ success: false, message: error.message, data: null });
  }
};

/**
 * @desc    Create Bootcamp 
 * @route   POST /api/v1/bootcamps
 * @access  Public
 */
const createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, message: "create bootcamp success", data: bootcamp });
  } catch (error) {
    console.error(`Error: ${error.message}`.red);
    res.status(400).json({ success: false, message: error.message, data: null });
  }
};

/**
 * @desc    Update Bootcamp 
 * @route   PUT /api/v1/bootcamps
 * @access  Public
 */
const updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!bootcamp) return res.status(404).json({ success: false, message: `data ${req.params.id} not found`, data: bootcamp });
    res.status(200).json({ success: true, message: `update bootcamps ${req.params.id}`, data: bootcamp });
  } catch (error) {
    console.error(`Error: ${error.message}`.red);
    res.status(400).json({ success: false, message: error.message, data: null });
  }
};

/**
 * @desc    Delete Bootcamp 
 * @route   DELETE /api/v1/bootcamps
 * @access  Public
 */
const deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) return res.status(404).json({ success: false, message: `data ${req.params.id} not found`, data: bootcamp });
    res.json({ success: true, message: `delete bootcamps ${req.params.id}`, data: {} });
  } catch (error) {
    console.error(`Error: ${error.message}`.red);
    res.status(400).json({ success: false, message: error.message, data: null });
  }
};

module.exports = {
  getBootcamps,
  getSingleBootcamp,
  updateBootcamp,
  createBootcamp,
  deleteBootcamp
};