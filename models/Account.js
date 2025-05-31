const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  accountId: { type: String, unique: true },
  accountName: { type: String, required: true },
  appSecretToken: { type: String, required: true },
  website: { type: String },
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account