const express = require('express');
const router = express.Router();
const Parent = require('../models/Parent');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const Payment = require('../models/Payment');
const { protect } = require('../middleware/authMiddleware');

router.get('/dashboard', protect, async (req, res) => {
    try {
        const parent = await Parent.findOne({ user: req.user._id }).populate({
            path: 'children',
            populate: { path: 'classAssigned' }
        });
        if (!parent) return res.status(404).json({ message: "Parent profile not found" });

        const childrenData = [];
        for (const child of parent.children) {
            const attendanceRecords = await Attendance.find({ student: child._id });
            const payments = await Payment.find({ student: child._id });
            childrenData.push({ child, attendanceRecords, payments });
        }

        res.json({ parent, childrenData });
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
