const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

global.wasteCategory = require('./models/wasteCategory');
global.wasteItem = require('./models/wasteItem');

// Routes
const wasteCategoryRoutes = require('./routes/wasteCategoryRoute');
const wasteItemRoutes = require('./routes/wasteItemRoute');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://hieu:hieu@microservice.lej2r.mongodb.net/?retryWrites=true&w=majority&appName=Microservice');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

wasteCategoryRoutes(app);
wasteItemRoutes(app);

// Start the server
app.use((req, res) => {
  res.status(404).send({url: `${req.originalUrl} not found`});
});

app.listen(PORT, () => {
  console.log(`Waste API running on port ${PORT}`);
});