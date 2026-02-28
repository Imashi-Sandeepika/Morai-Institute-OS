const { User, Institute } = require('../models/sql');
const MongoUser = require('../models/User');
const MongoInstitute = require('../models/Institute');
const jwt = require('jsonwebtoken');

exports.registerInstitute = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ where: { email } });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const newInstitute = await Institute.create({
            name, email, address: 'Pending', phone: 'Pending', regNo: 'Pending'
        });

        const newUser = await User.create({
            name, email, password, role: 'institute', instituteId: newInstitute.id
        });

        const token = jwt.sign({ id: newUser.id, role: newUser.role, instituteId: newInstitute.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ user: newUser, token });
    } catch (err) {
        console.error('Registration SQL Error:', err);
        if (err.name === 'SequelizeConnectionRefusedError' || err.name === 'SequelizeConnectionError' || (err.message && err.message.includes('ECONNREFUSED'))) {
            try {
                const { name, email, password } = req.body;
                const userExists = await MongoUser.findOne({ email });
                if (userExists) return res.status(400).json({ message: 'User already exists' });

                const newInst = await MongoInstitute.create({ name, email, address: 'Pending', phone: 'Pending' });
                const newUser = await MongoUser.create({ name, email, password, role: 'institute', instituteId: newInst._id });

                const token = jwt.sign({ id: newUser._id, role: newUser.role, instituteId: newInst._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                return res.status(201).json({ user: newUser, token, persisting: 'MongoDB' });
            } catch (mongoErr) {
                return res.status(503).json({ message: 'Database failure. Both DB engines are unavailable.' });
            }
        }
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role: user.role, instituteId: user.instituteId }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ user, token });
    } catch (err) {
        console.error('Login SQL Error:', err);
        if (err.name === 'SequelizeConnectionRefusedError' || err.name === 'SequelizeConnectionError' || (err.message && err.message.includes('ECONNREFUSED'))) {
            try {
                const { email, password } = req.body;
                const user = await MongoUser.findOne({ email });
                if (!user) return res.status(404).json({ message: 'User not found' });

                // For dev fallback, direct match if hashing is causing issues or not hooked
                const isMatch = await user.matchPassword(password);
                if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

                const token = jwt.sign({ id: user._id, role: user.role, instituteId: user.instituteId }, process.env.JWT_SECRET, { expiresIn: '1d' });
                return res.status(200).json({ user, token, persisting: 'MongoDB' });
            } catch (mongoErr) {
                return res.status(503).json({ message: 'Database connection failed.' });
            }
        }
        res.status(500).json({ message: err.message });
    }
};
