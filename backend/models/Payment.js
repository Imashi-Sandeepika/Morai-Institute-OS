const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    institute: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    amount: { type: Number, required: true },
    month: { type: String, required: true }, // e.g., 'Jan-2026'
    year: { type: Number, required: true },
    status: { type: String, enum: ['Paid', 'Unpaid', 'Partial', 'Pending'], default: 'Pending' }, // Pending for verification
    slipImage: { type: String }, // Cloudinary URL
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    paymentDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
