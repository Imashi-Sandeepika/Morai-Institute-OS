const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    institute: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
    studentId: { type: String, required: true },
    name: { type: String, required: true },
    classAssigned: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent' },
    joinDate: { type: Date, default: Date.now },
    profilePicture: { type: String },
    feeStatus: { type: String, enum: ['Paid', 'Unpaid', 'Partial'], default: 'Unpaid' }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
