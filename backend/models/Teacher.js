const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    institute: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
    teacherId: { type: String, required: true },
    name: { type: String, required: true },
    subject: { type: String },
    qualification: { type: String },
    salary: { type: Number, default: 0 },
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
    joinDate: { type: Date, default: Date.now },
    profilePicture: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Teacher', TeacherSchema);
