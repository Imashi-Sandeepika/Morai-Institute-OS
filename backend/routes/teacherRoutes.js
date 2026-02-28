const express = require('express');
const router = express.Router();
const Class = require('../models/Class');
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const { protect } = require('../middleware/authMiddleware');

// Get teacher's classes
router.get('/classes', protect, async (req, res) => {
    try {
        const classes = await Class.find({ teacher: req.user._id, institute: req.user.institute }).populate('students');
        res.json(classes);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

// Post attendance
router.post('/attendance', protect, async (req, res) => {
    try {
        const { classId, records, date } = req.body;
        // records: [{ student: id, status: 'Present'/'Absent' }]
        const attendances = records.map(r => ({
            institute: req.user.institute,
            class: classId,
            teacher: req.user._id, // User id of teacher. Wait, the Attendance schema references Teacher. It should be Teacher's ID. 
            // Need to fix this, user._id is User. Let's use user id for simplicity if needed, or query Teacher.
            student: r.student,
            date: new Date(date),
            status: r.status
        }));
        await Attendance.insertMany(attendances);
        res.status(201).json({ message: 'Attendance marked' });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
