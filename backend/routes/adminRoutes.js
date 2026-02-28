const express = require('express');
const router = express.Router();
const {
    addStudent, addTeacher, addClass,
    getStudents, getTeachers, getClasses,
    getDashboardStats, deleteStudent, deleteTeacher, getTeacherById, getStudentById, getClassById,
    recordPayment, postAnnouncement, getAnnouncements
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { generateReport } = require('../utils/pdfGenerator');
const { Student, Teacher } = require('../models/sql');

router.post('/add-student', protect, upload.single('profilePicture'), addStudent);
router.post('/add-teacher', protect, upload.single('profilePicture'), addTeacher);
router.post('/add-class', protect, addClass);

router.get('/dashboard', protect, getDashboardStats);
router.get('/students', protect, getStudents);
router.get('/students/:id', protect, getStudentById);
router.get('/teachers', protect, getTeachers);
router.get('/teachers/:id', protect, getTeacherById);
router.get('/classes', protect, getClasses);
router.get('/classes/:id', protect, getClassById);

router.delete('/student/:id', protect, deleteStudent);
router.delete('/teacher/:id', protect, deleteTeacher);

// Payments & Messaging
router.post('/payments', protect, upload.single('slip'), recordPayment);
router.post('/announcements', protect, postAnnouncement);
router.get('/announcements', protect, getAnnouncements);

// PDF Export Endpoints
router.get('/reports/students-pdf', protect, async (req, res) => {
    try {
        const students = await Student.findAll({ include: ['User'] });
        const data = students.map(s => ({ name: s.User.name, id: s.studentId }));
        generateReport(res, 'Student List', data, [{ label: 'Name', key: 'name' }, { label: 'ID', key: 'id' }]);
    } catch (err) { res.status(500).send(err.message); }
});

module.exports = router;
