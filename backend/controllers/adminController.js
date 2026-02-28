const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Class = require('../models/Class');

exports.addStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.create(req.body);
        res.status(201).json(teacher);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addClass = async (req, res) => {
    try {
        const newClass = await Class.create(req.body);
        res.status(201).json(newClass);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json(teachers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getClasses = async (req, res) => {
    try {
        const classes = await Class.find();
        res.status(200).json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getDashboardStats = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const totalTeachers = await Teacher.countDocuments();
        const totalClasses = await Class.countDocuments();

        res.status(200).json({
            totalStudents,
            totalTeachers,
            totalClasses,
            unpaidFeePercentage: 20 // Placeholder for now
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
