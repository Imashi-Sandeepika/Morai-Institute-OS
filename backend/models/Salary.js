const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({
    institute: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    amount: { type: Number, required: true },
    month: { type: String, required: true },
    year: { type: Number, required: true },
    status: { type: String, enum: ['Paid', 'Unpaid'], default: 'Unpaid' },
    paymentDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Salary', SalarySchema);
