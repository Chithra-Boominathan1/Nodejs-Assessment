
const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  accountId: { type: String, required: true },
  url: { type: String, required: true },
  method: { type: String, required: true },
  headers: { type: Object, required: true },
});

const Destination = mongoose.model('Destination', destinationSchema);
module.exports = Destination