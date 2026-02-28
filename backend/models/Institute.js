const mongoose = require('mongoose');

const instituteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    email: { type: String, required: true },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    logo: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Institute', instituteSchema);
