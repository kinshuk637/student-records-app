const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req,res)=>{
    User.find()                              //would return list of all users from DB
    .then(users => res.json(users))          //would return the response in json form
    .catch(err => res.status(400).json('Error: '+err))
});

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const newUser = new User({username});

    newUser.save()       //new user saved to DB
    .then( () => res.json('User Added!'))
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;