const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    subject: { type: String, required: true },
    monthlySalary: { type: Number, required: true },
    profilePicture: { type: String, default: '' },
    instituteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute' },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
