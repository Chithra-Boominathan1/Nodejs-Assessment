const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.post('/', async (req, res) => {
  try {
    const { email,password,craeted_by,updated_by } = req.body;
    const user = new User({
      email,
      password,
      craeted_by,
      updated_by
    });
    await user.save();
    res.status(201).json(account);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/', async (req, res) => {
  const user = await User.findOne({ email: req.query.email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

router.put('/:id', async (req, res) => {
  const update = req.body;
  const user = await User.findOneAndUpdate({ email: req.params.id }, update, { new: true });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

router.delete('/:id', async (req, res) => {
  const user = await User.findOneAndDelete({ email: req.params.id });
  if (!user) return res.status(404).json({ message: 'User not found' });
  await Destination.deleteMany({ email: req.params.id });
  res.json({ message: 'user deleted' });
});

module.exports = router;
