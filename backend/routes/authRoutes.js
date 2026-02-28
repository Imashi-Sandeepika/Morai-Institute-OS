const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Institute = require('../models/Institute');

const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role, institute: user.institute }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d'
    });
};

router.post('/register-institute', async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        let admin = await User.findOne({ email });
        if (admin) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        admin = new User({ name, email, password: hashedPassword, role: 'superadmin' }); // or institute admin

        const institute = new Institute({ name, email, phone, address, admin: admin._id });
        await institute.save();

        admin.institute = institute._id;
        await admin.save();

        const token = generateToken(admin);
        res.status(201).json({ token, user: { id: admin._id, name, email, role: admin.role, institute: admin.institute } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).populate('institute');
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        if (user.status === 'Inactive') return res.status(400).json({ message: 'Account is inactive' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = generateToken(user);
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, institute: user.institute, profilePicture: user.profilePicture } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
