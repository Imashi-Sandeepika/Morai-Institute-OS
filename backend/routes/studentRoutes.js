const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Student = require('../models/Student');

// Get student profile (for students)
router.get('/profile', protect, async (req, res) => {
    try {
        const student = await Student.findOne({ email: req.user.email });
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
