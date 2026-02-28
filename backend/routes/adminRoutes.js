const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Class = require('../models/Class');
const bcrypt = require('bcrypt');
const { protect, admin } = require('../middleware/authMiddleware');

// Get Dashboard Stats
router.get('/dashboard', protect, admin, async (req, res) => {
    try {
        const instituteId = req.user.institute;
        const totalStudents = await Student.countDocuments({ institute: instituteId });
        const totalTeachers = await Teacher.countDocuments({ institute: instituteId });
        const totalClasses = await Class.countDocuments({ institute: instituteId });
        // Dummy values for charts
        res.json({ totalStudents, totalTeachers, totalClasses, unpaidFeePercentage: 15 });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

// Teachers CRUD
router.get('/teachers', protect, admin, async (req, res) => {
    try {
        const teachers = await Teacher.find({ institute: req.user.institute }).populate('user', '-password').populate('classes');
        res.json(teachers);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/teachers', protect, admin, async (req, res) => {
    try {
        const { name, email, password, teacherId, subject, qualification, salary } = req.body;
        let exist = await User.findOne({ email });
        if (exist) return res.status(400).json({ message: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashed, role: 'teacher', institute: req.user.institute });
        await user.save();

        const teacher = new Teacher({ user: user._id, institute: req.user.institute, teacherId, name, subject, qualification, salary });
        await teacher.save();

        res.status(201).json(teacher);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

// Delete Teacher
router.delete('/teachers/:id', protect, admin, async (req, res) => {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    await User.findByIdAndDelete(teacher.user);
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: "Teacher deleted successfully" });
});


// Classes CRUD
router.get('/classes', protect, admin, async (req, res) => {
    const classes = await Class.find({ institute: req.user.institute }).populate('teacher', 'name teacherId');
    res.json(classes);
});

router.post('/classes', protect, admin, async (req, res) => {
    const { name, teacher, monthlyFee, schedule } = req.body;
    const newClass = new Class({ name, teacher, monthlyFee, schedule, institute: req.user.institute });
    await newClass.save();
    // Also push to teacher's classes array
    if (teacher) {
        await Teacher.findByIdAndUpdate(teacher, { $push: { classes: newClass._id } });
    }
    res.status(201).json(newClass);
});

// Students CRUD
router.get('/students', protect, admin, async (req, res) => {
    const students = await Student.find({ institute: req.user.institute }).populate('user', '-password').populate('classAssigned', 'name');
    res.json(students);
});

router.post('/students', protect, admin, async (req, res) => {
    const { name, email, password, studentId, classAssigned } = req.body;
    let exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "User exists" });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role: 'student', institute: req.user.institute });
    await user.save();
    const student = new Student({ user: user._id, institute: req.user.institute, studentId, name, classAssigned });
    await student.save();
    if (classAssigned) {
        await Class.findByIdAndUpdate(classAssigned, { $push: { students: student._id } });
    }
    res.status(201).json(student);
});

module.exports = router;
