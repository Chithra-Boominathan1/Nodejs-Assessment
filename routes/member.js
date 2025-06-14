const AccountMember = require('../models/member');
const express = require('express');
const router = express.Router();
router.post('/',async (req, res) => {
  const member = await AccountMember.create(req.body);
  res.status(201).json({ success: true, data: member });
});

router.get('/',async (req, res) => {
  const members = await AccountMember.find().populate('user_id accountId role_id');
  res.json({ success: true, data: members });
});

router.put('/:id',async (req, res) => {
  const updated = await AccountMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, data: updated });
});

router.delete('/:id',async (req, res) => {
  await AccountMember.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Deleted' });
});
module.exports = router;
