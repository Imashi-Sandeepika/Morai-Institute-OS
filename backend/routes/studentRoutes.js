const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Payment = require('../models/Payment');
const Attendance = require('../models/Attendance');
const { protect } = require('../middleware/authMiddleware');

router.get('/dashboard', protect, async (req, res) => {
    try {
        const student = await Student.findOne({ user: req.user._id }).populate('classAssigned');
        if (!student) return res.status(404).json({ message: "Student profile not found" });

        const attendanceRecords = await Attendance.find({ student: student._id });
        const payments = await Payment.find({ student: student._id });

        const totalDays = attendanceRecords.length;
        const presentDays = attendanceRecords.filter(a => a.status === 'Present').length;
        const attendancePercentage = totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

        res.json({
            student,
            attendancePercentage: attendancePercentage.toFixed(2),
            payments
        });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
