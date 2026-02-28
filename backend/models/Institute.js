const mongoose = require('mongoose');

const InstituteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    logo: { type: String },
    bankDetails: {
        accountName: String,
        accountNumber: String,
        bankName: String,
        ifscCode: String
    },
    paymentSettings: {
        currency: { type: String, default: 'USD' }
    },
    websiteInfo: {
        description: String,
        socialLinks: {
            facebook: String,
            twitter: String,
            instagram: String
        }
    },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // User ID of the admin
}, { timestamps: true });

module.exports = mongoose.model('Institute', InstituteSchema);
