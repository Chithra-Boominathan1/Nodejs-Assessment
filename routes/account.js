const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Account = require('../models/Account');
const Destination = require('../models/Destination');

function generateAppSecret() {
  return uuidv4() + uuidv4();
}

// Create Account
router.post('/', async (req, res) => {
  try {
    const { email, accountName, website } = req.body;
    const account = new Account({
      email,
      accountName,
      website,
      accountId: uuidv4(),
      appSecretToken: generateAppSecret(),
    });
    await account.save();
    res.status(201).json(account);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Account
router.get('/:id', async (req, res) => {
  const account = await Account.findOne({ accountId: req.params.id });
  if (!account) return res.status(404).json({ message: 'Account not found' });
  res.json(account);
});

// Update Account
router.put('/:id', async (req, res) => {
  const update = req.body;
  const account = await Account.findOneAndUpdate({ accountId: req.params.id }, update, { new: true });
  if (!account) return res.status(404).json({ message: 'Account not found' });
  res.json(account);
});

// Delete Account + Destinations
router.delete('/:id', async (req, res) => {
  const account = await Account.findOneAndDelete({ accountId: req.params.id });
  if (!account) return res.status(404).json({ message: 'Account not found' });
  await Destination.deleteMany({ accountId: req.params.id });
  res.json({ message: 'Account and destinations deleted' });
});

module.exports = router;
