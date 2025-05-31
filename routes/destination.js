const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');

// Create Destination
router.post('/', async (req, res) => {
  try {
    const { accountId, url, method, headers } = req.body;
    const destination = new Destination({ accountId, url, method: method.toUpperCase(), headers });
    await destination.save();
    res.status(201).json(destination);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Destinations for an Account
router.get('/:accountId', async (req, res) => {
  const destinations = await Destination.find({ accountId: req.params.accountId });
  res.json(destinations);
});

// Update Destination
router.put('/:id', async (req, res) => {
  const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!destination) return res.status(404).json({ message: 'Destination not found' });
  res.json(destination);
});

// Delete Destination
router.delete('/:id', async (req, res) => {
  const destination = await Destination.findByIdAndDelete(req.params.id);
  if (!destination) return res.status(404).json({ message: 'Destination not found' });
  res.json({ message: 'Destination deleted' });
});

module.exports = router;
