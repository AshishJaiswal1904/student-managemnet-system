const express = require('express')

const router = express.Router();
const studentController = require('../controllers/studentController')


// create, update, find, delete
router.get('/', studentController.viewAllStudent)
router.post('/', studentController.find)
router.get('/addstudent', studentController.formStudent);
router.post('/addstudent', studentController.createStudent);

// Edit User
router.get('/editstudent/:id', studentController.editStudent);
router.post('/editstudent/:id', studentController.updateStudent);


// View User
router.get('/viewstudent/:id', studentController.viewStudent);


//Delete User
router.get('/deletestudent/:id', studentController.deleteStudent);

// Navigation 
// router.get("/", (req, res) => {
//     res.render('home')
// })

module.exports = router;