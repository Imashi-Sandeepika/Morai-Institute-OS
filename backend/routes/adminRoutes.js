const express = require('express');
const router = express.Router();
const { addStudent, addTeacher, addClass, getStudents, getTeachers, getClasses, getDashboardStats } = require('../controllers/adminController');

router.post('/add-student', addStudent);
router.post('/add-teacher', addTeacher);
router.post('/add-class', addClass);

router.get('/dashboard', getDashboardStats);
router.get('/students', getStudents);
router.get('/teachers', getTeachers);
router.get('/classes', getClasses);

module.exports = router;
