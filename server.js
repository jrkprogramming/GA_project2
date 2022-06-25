var express = require('express');
var path = require('path');
const normalizePort = require('normalize-port')
const PORT = normalizePort(process.env.PORT || 9000);
var cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport')
const methodOverride = require('method-override')
const mealPrepRoutes = require('./routes/recipeRoutes');
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/userRoutes')
const bodyParser = require('body-parser')

require('dotenv').config();
require('./config/database.js')
require('./config/passport');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ 
  extended: true 
}));
app.use(bodyParser.json())

app.use(session({
  secret: 'SEIRocks!',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', mealPrepRoutes)
app.use('/', authRoutes)
app.use('/', userRoutes)


app.listen(PORT, () => {
  console.log(`ITS OVER ${PORT}`)
})