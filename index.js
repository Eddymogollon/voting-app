const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./models/Poll');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(bodyParser.json()); 
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/current-user', (req, res) => {

  console.log(req);

  res.send(req.user);
});

require('./routes/authRoutes')(app);
require('./routes/pollRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log("App created at http://localhost:5000/");












