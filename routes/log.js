const Log = require('../models/log');
const express = require('express');
const router = express.Router();
router.get('/getlogs', async (req, res) => {
  const logs = await Log.find().sort({ received_timestamp: -1 });
  res.json({ success: true, data: logs });
});

router.get('/getLogsByFilter',async (req, res) => {
  const { account_id, status } = req.query;
  const query = {};

  if (account_id) query.account_id = account_id;
  if (status) query.status = status;

  const logs = await Log.find(query);
  res.json({ success: true, data: logs });
});

module.exports = router