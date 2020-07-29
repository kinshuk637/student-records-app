const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req,res)=>{
    Exercise.find()                              //would return list of all users from DB
    .then(exercises => res.json(exercises))          //would return the response in json form
    .catch(err => res.status(400).json('Error: '+err))
});

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const Class = req.body.Class;
    const enrollment_no = req.body.enrollment_no;
    const address = req.body.address;
    const date = Date.parse(req.body.date);
    const newExercise = new Exercise({
        username,
        Class,
        enrollment_no,
        address,
        date
    });

    newExercise.save()       //new user saved to DB
    .then( () => res.json('Exercise Added!'))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').get((req,res)=>{
    Exercise.findById(req.params.id)   //getting the id from slash(/)id
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: '+err))
});

router.route('/:id').delete((req,res)=>{
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercises Deleted.'))
    .catch(err => res.status(400).json('Error: '+err))
});

router.route('/update/:id').post((req,res)=>{
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.Class = req.body.Class;
        exercise.enrollment_no = req.body.enrollment_no;
        exercise.address = req.body.address;
        exercise.date = Date(req.body.date);

        exercise.save()
        .then(() => res.json('Exercise Updated!'))
        .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: '+err));
})

module.exports = router;