var express = require('express');
var path = require('path');
// const PORT = 9000
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
// const http = require('http')
// const cloudinary = require('./config/cloudinary')
// const upload = require('multer')
// const fs = require('fs')
// const upload = require('./controllers/recipeController')

require('dotenv').config();
require('./config/database.js')
require('./config/passport');



var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ 
  extended: false 
}));
app.use(bodyParser.json())


app.use('/mealPrep/new', async (req, res) => {

  const uploader = async (path) => await cloudinary.UploadStream(path, 'Images');

  if (req.method === "POST") {
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const {path} = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path)
    }

    res.status(200).json({
      message: 'images uploaded successfully',
      data: urls
    })

  } else {
    res.status(405).json({
      err: `${req.method} method not allowed`

    })
  }
})

// https://andela.com/insights/how-to-use-cloudinary-and-nodejs-to-upload-multiple-images/


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


// app.listen(PORT, function() {
//     console.log('ITS OVER', PORT)
// })

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})