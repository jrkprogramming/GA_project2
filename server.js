var express = require('express');
var path = require('path');
const PORT = 9000
var cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport')
const methodOverride = require('method-override')
const mealPrepRoutes = require('./routes/recipeRoutes');
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/userRoutes')

// Multer
const multer = require('multer');
const Images = require('./models/images')

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


// Storage for Multer

const Storage = multer.diskStorage({
    destination:'uploads',
    fileName: (req,file,cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage:Storage
}).single('testImage')

app.post('/upload', (req, res) => {
    upload(req,res,err => {
        if(err){
            console.log(err)
        } else {
            const newImage = new Images({
                name: req.body.name,
                image: {
                    data:req.file.filename,
                    contentType:'image/png'
                }
            })
            newImage.save()
            .then(()=>res.send('sucessfully uploaded image'))
            .catch(err=>console.log(err))
        }
    })
})



app.listen(PORT, function() {
    console.log('ITS OVER', PORT)
})