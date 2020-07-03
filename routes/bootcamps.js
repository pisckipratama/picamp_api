const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ success: true, message: "show all bootcamps" });
});

router.get('/:id', (req, res) => {
  res.status(200).json({ success: true, message: `show bootcamps ${req.params.id}` });
});

router.post('/', (req, res) => {
  res.status(201).json({ success: true, message: "create bootcamp" });
});

router.put('/:id', (req, res) => {
  res.json({ success: true, message: `update bootcamps ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
  res.json({ success: true, message: `delete bootcamps ${req.params.id}` });
});

module.exports = router;