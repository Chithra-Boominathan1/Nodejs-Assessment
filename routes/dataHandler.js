const express = require('express');
const router = express.Router();
const axios = require('axios');
const Account = require('../models/Account');
const Destination = require('../models/Destination');

router.post('/incoming_data', async (req, res) => {
  const token = req.headers['cl-x-token'];
  if (!token) return res.status(401).json({ message: 'Un Authenticate' });

  const account = await Account.findOne({ appSecretToken: token });
  if (!account) return res.status(401).json({ message: 'Un Authenticate' });

  const data = req.body;
  if (typeof data !== 'object' || data === null) {
    return res.status(400).json({ message: 'Invalid Data' });
  }

  const destinations = await Destination.find({ accountId: account.accountId });

  for (const dest of destinations) {
    try {
      const method = dest.method.toUpperCase();
      const options = {
        method,
        url: dest.url,
        headers: dest.headers,
      };

      if (method === 'GET') {
        options.params = data;
      } else if (['POST', 'PUT'].includes(method)) {
        options.data = data;
      }

      await axios(options);
    } catch (err) {
      console.error(`Failed to send to ${dest.url}:`, err.message);
    }
  }

  res.json({ message: 'Data sent to destinations' });
});

module.exports = router;
