const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    institute: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['Present', 'Absent', 'Late'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
