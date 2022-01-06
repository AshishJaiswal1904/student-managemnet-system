const express = require('express')

const router = express.Router();
const courseController = require('../controllers/courseController')


// create, update, find, delete
router.get('/viewallcourse', courseController.viewAllCourse);
router.post('/findcourse', courseController.findCourse);
router.get('/addcourse', courseController.formCourse);
router.post('/addcourse', courseController.createCourse);

// Edit User
router.get('/editcourse/:id', courseController.editCourse);
router.post('/editcourse/:id', courseController.updateCourse);


// View User
router.get('/viewcourse/:id', courseController.viewCourse);


//Delete User
router.get('/deletecourse/:id', courseController.deleteCourse);

// Navigation 
// router.get("/", (req, res) => {
//     res.render('home')
// })

module.exports = router;