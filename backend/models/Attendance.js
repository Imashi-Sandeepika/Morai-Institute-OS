const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    institute: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['Present', 'Absent', 'Late'], default: 'Present' }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
