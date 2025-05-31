const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const accountRoutes = require('./routes/account');
const destinationRoutes = require('./routes/destination');
const dataHandlerRoutes = require('./routes/dataHandler');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/data-pusher', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/accounts', accountRoutes);
app.use('/destinations', destinationRoutes);
app.use('/server', dataHandlerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
