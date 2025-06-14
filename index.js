const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const accountRoutes = require('./routes/account');
const destinationRoutes = require('./routes/destination');
const dataHandlerRoutes = require('./routes/dataHandler');
const userRoutes = require('./routes/user')
const memberRoutes = require('./routes/member')
const logRoutes = require('./routes/log')
const app = express();
app.use(bodyParser.json());
const rateLimit = require('express-rate-limit');


const limiter = rateLimit({
  windowMs: 1000,
  max: 5,
  keyGenerator: (req) => req.headers['accountid'] || 'anonymous',
  handler: (req, res) => {
    return res.status(429).json({ message: 'Too many requests, please slow down.' });
  }
});

app.use(express.json());
mongoose.connect('mongodb://localhost:27017/data-pusher', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/accounts', accountRoutes);
app.use('/destinations', destinationRoutes);
app.use('/server',limiter, dataHandlerRoutes);
app.use('/user',userRoutes)
app.use('/member',memberRoutes)
app.use('/log',logRoutes)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
