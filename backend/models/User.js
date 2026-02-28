const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['superadmin', 'institute', 'teacher', 'student', 'parent'],
        default: 'student'
    },
    institute: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute' }, // for all roles inside an institute
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    profilePicture: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
