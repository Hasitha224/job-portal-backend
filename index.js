const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.SERVER_PORT || 3001;
const app = express();

const userRoute = require('./routes/userRoutes');
const vacancyRoute = require('./routes/vacancyRoutes');
const applicationRoute = require('./routes/applicationRoutes');
const publicRoute = require('./routes/publicRoute');
//allow requests from frontend domain
const allowedOrigins = ['http://localhost:3000', 'https://job-portal-system-sgln.onrender.com'];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error);
});

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.use('/users',userRoute);
app.use('/vacancies',vacancyRoute);
app.use('/applications',applicationRoute);
app.use('/public',publicRoute);

app.listen(port,()=>{
    console.log(`Server started and running on port ${port}`);
})
