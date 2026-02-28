const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    name: { type: String, required: true },
    institute: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    monthlyFee: { type: Number, required: true },
    schedule: { type: String }, // e.g. Mon-Wed-Fri 10:00 AM - 12:00 PM
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
}, { timestamps: true });

module.exports = mongoose.model('Class', ClassSchema);
