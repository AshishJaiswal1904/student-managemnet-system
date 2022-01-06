const express = require('express')

const router = express.Router();
const instructorController = require('../controllers/instructorController')


// create, update, find, delete
router.get('/viewallinstructor', instructorController.viewAllInstructor);
router.post('/findinstructor', instructorController.findInstructor);
router.get('/addinstructor', instructorController.formInstructor);
router.post('/addinstructor', instructorController.createInstructor);

// Edit User
router.get('/editinstructor/:id', instructorController.editInstructor);
router.post('/editinstructor/:id', instructorController.updateInstructor);


// View User
router.get('/viewinstructor/:id', instructorController.viewInstructor);


//Delete User
router.get('/deleteinstructor/:id', instructorController.deleteInstructor);

// Navigation 
// router.get("/", (req, res) => {
//     res.render('home')
// })

module.exports = router;