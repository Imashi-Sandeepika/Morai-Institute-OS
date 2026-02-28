const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    className: { type: String, required: true },
    subject: { type: String, required: true },
    teacher: { type: String, required: true }, // Or ref to Teacher
    numberOfStudent: { type: Number, default: 0 },
    monthlyFee: { type: Number, required: true },
    schedule: { type: String, required: true },
    instituteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute' }
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);
