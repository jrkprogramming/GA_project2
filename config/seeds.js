require('./database')
const Recipe = require('../models/recipe')
const User = require('../models/user')
const mealSeeds = require('./seeds.json')

// Delete all bookmarks in the database
Recipe.deleteMany({})
// then delete all our users
.then(() => User.deleteMany({}))
.then(() =>{
    // then return updates bookmarks with a owner: user._id
    // first creates user, then maps over bookmarks and adds that id id
    return User.create({name: "Jose", email:'jrkaibigan@gmail.com', googleId: "my Google ID"})
    .then((user) =>{
        return mealSeeds.map((recipe) => ({...recipe, owner: user._id}))
    })
})
.then((recipes)=>{
    // return newly Inserted bookmarks into the db
    return Recipe.insertMany(recipes)
})
.then((recipes)=>{
    console.log(recipes)
})
.catch(console.error)
.finally(()=>{
    process.exit()
})


// sample data
// https://gimmedelicious.com/20-minute-meal-prep-chicken-rice-and-broccoli/ 