const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    name: { type: String, required: true },
    className: { type: String, required: true }, // Or ref to Class
    parentName: { type: String, required: true },
    parentNumber: { type: String, required: true },
    profilePicture: { type: String, default: '' },
    instituteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute' },
    status: { type: String, enum: ['Paid', 'Unpaid', 'Partial'], default: 'Unpaid' }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
