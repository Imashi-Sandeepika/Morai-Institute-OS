const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
    institute: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    target: { type: String, enum: ['All', 'Class', 'Student'], default: 'All' },
    targetClass: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    targetStudent: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' } // Or user ID
}, { timestamps: true });

module.exports = mongoose.model('Announcement', AnnouncementSchema);
