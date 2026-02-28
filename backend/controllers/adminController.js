const { Student, Teacher, Class, User, Payment, Attendance } = require('../models/sql');
const MongoUser = require('../models/User'); // Mongoose versions
const MongoTeacher = require('../models/Teacher');
const MongoStudent = require('../models/Student');
const MongoClass = require('../models/Class');

// Dashboard Stats
exports.getDashboardStats = async (req, res) => {
    try {
        const totalStudents = await Student.count();
        const totalTeachers = await Teacher.count();
        const totalClasses = await Class.count();

        // Calculate unpaid fee %
        const unpaidCount = await Payment.count({ where: { status: 'Unpaid' } });
        const totalPayments = await Payment.count();
        const unpaidPercentage = totalPayments > 0 ? (unpaidCount / totalPayments) * 100 : 0;

        res.status(200).json({
            totalStudents,
            totalTeachers,
            totalClasses,
            unpaidFeePercentage: Math.round(unpaidPercentage)
        });
    } catch (err) {
        const isConnectionError = err.name?.includes('SequelizeConnection') || err.message?.includes('ECONNREFUSED') || err.message?.includes('ConnectionError');
        if (isConnectionError) {
            try {
                const totalStudents = await MongoStudent.countDocuments();
                const totalTeachers = await MongoTeacher.countDocuments();
                const totalClasses = await MongoClass.countDocuments();

                // For unpaid fee %
                let unpaidPercentage = 0; // Keeping simple as payment fallback may not be fully complete

                return res.status(200).json({
                    totalStudents,
                    totalTeachers,
                    totalClasses,
                    unpaidFeePercentage: unpaidPercentage
                });
            } catch (mongoErr) {
                return res.status(503).json({ message: 'Database connection failed.' });
            }
        }
        res.status(500).json({ message: err.message });
    }
};

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.findAll({ include: [User] });
        res.status(200).json(students);
    } catch (err) {
        const isConnectionError = err.name?.includes('SequelizeConnection') || err.message?.includes('ECONNREFUSED') || err.message?.includes('ConnectionError');

        if (isConnectionError) {
            try {
                const students = await MongoStudent.find();
                console.log(`Fetched ${students.length} students from MongoDB.`);
                const formatted = students.map(s => ({
                    ...s._doc,
                    id: s._id,
                    _id: s._id,
                    studentId: s.studentId,
                    name: s.name,
                    className: s.className,
                    parent: s.parentName,
                    phone: s.parentNumber,
                    status: s.status || 'Unpaid',
                    profilePicture: s.profilePicture
                }));
                return res.status(200).json(formatted);
            } catch (mongoErr) {
                console.error('MongoDB query failed:', mongoErr.name, mongoErr.message);
            }
        }
        res.status(200).json([]);
    }
};

// Students
exports.addStudent = async (req, res) => {
    try {
        const { name, email, password, studentId, className, parentName, parentNumber, instituteId } = req.body;
        const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;

        const user = await User.create({
            name, email, password, role: 'student', instituteId, profilePicture
        });

        const student = await Student.create({
            userId: user.id,
            studentId,
            currentClassId: className,
            parentName,
            parentNumber
        });

        res.status(201).json({ user, student });
    } catch (err) {
        const isConnectionError = err.name?.includes('SequelizeConnection') || err.message?.includes('ECONNREFUSED') || err.message?.includes('ConnectionError');

        if (isConnectionError) {
            try {
                const { name, email, password, studentId, className, parentName, parentNumber, instituteId } = req.body;
                const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;

                const validInstituteId = (instituteId && instituteId.length === 24) ? instituteId : null;

                const user = await MongoUser.create({ name, email, password, role: 'student', instituteId: validInstituteId, profilePicture });
                const student = await MongoStudent.create({
                    name,
                    studentId,
                    className,
                    parentName,
                    parentNumber,
                    userId: user._id, // Keep association if possible
                    profilePicture,
                    instituteId: validInstituteId
                });

                console.log(`Student [${name}] successfully saved to MongoDB.`);
                return res.status(201).json({ user, student, persisting: 'MongoDB' });
            } catch (mongoErr) {
                console.error('CRITICAL: MongoDB also failed during student creation:', mongoErr.message);
                return res.status(503).json({ message: 'Database connection failed. Please check MongoDB service.' });
            }
        }
        res.status(500).json({ message: err.message });
    }
};

exports.addTeacher = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, subject, monthlySalary, instituteId } = req.body;
        const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;

        const user = await User.create({
            name, email, password, role: 'teacher', instituteId, phone: phoneNumber, profilePicture
        });

        const teacher = await Teacher.create({
            userId: user.id,
            specialization: subject,
            salary: monthlySalary
        });

        res.status(201).json({ user, teacher });
    } catch (err) {
        const isConnectionError = err.name?.includes('SequelizeConnection') || err.message?.includes('ECONNREFUSED') || err.message?.includes('ConnectionError');

        if (isConnectionError) {
            try {
                const { name, email, password, phoneNumber, subject, monthlySalary, instituteId } = req.body;
                const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;

                const validInstituteId = (instituteId && instituteId.length === 24) ? instituteId : null;

                const user = await MongoUser.create({ name, email, password, role: 'teacher', instituteId: validInstituteId, profilePicture });
                const teacher = await MongoTeacher.create({
                    name,
                    phoneNumber,
                    subject,
                    monthlySalary,
                    profilePicture,
                    instituteId: validInstituteId,
                    userId: user._id
                });

                console.log(`Teacher [${name}] successfully saved to MongoDB.`);
                return res.status(201).json({ user, teacher, persisting: 'MongoDB' });
            } catch (mongoErr) {
                console.error('CRITICAL: MongoDB also failed during teacher creation:', mongoErr.message);
                return res.status(503).json({ message: 'Database connection failed. Please check MongoDB service.' });
            }
        }
        res.status(500).json({ message: err.message });
    }
};

exports.getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll({ include: [User] });
        res.status(200).json(teachers);
    } catch (err) {
        const isConnectionError = err.name?.includes('SequelizeConnection') || err.message?.includes('ECONNREFUSED') || err.message?.includes('ConnectionError');

        if (isConnectionError) {
            try {
                // Remove .populate to avoid CastError with non-ObjectId types
                const teachers = await MongoTeacher.find();
                console.log(`Fetched ${teachers.length} teachers from MongoDB.`);
                const formatted = teachers.map(t => ({
                    ...(t._doc || t),
                    id: t._id.toString(),
                    _id: t._id.toString(),
                    name: t.name,
                    subject: t.subject || t.specialization,
                    phone: t.phoneNumber || t.phone,
                    phoneNumber: t.phoneNumber || t.phone,
                    salary: t.monthlySalary || t.salary,
                    profilePicture: t.profilePicture
                }));
                return res.status(200).json(formatted);
            } catch (mongoErr) {
                console.error('MongoDB query failed:', mongoErr.name, mongoErr.message);
            }
        }
        res.status(200).json([]);
    }
};

// Classes
exports.addClass = async (req, res) => {
    try {
        const { className, subject, teacher, numberOfStudent, monthlyFee, schedule, instituteId } = req.body;

        const newClass = await Class.create({
            name: className,
            subject: subject,
            teacherId: teacher && teacher.length > 20 ? teacher : '00000000-0000-0000-0000-000000000000',
            fee: monthlyFee,
            schedule: schedule,
            instituteId: instituteId || '00000000-0000-0000-0000-000000000000'
        });
        res.status(201).json(newClass);
    } catch (err) {
        const isConnectionError = err.name?.includes('SequelizeConnection') || err.message?.includes('ECONNREFUSED') || err.message?.includes('ConnectionError');
        if (isConnectionError) {
            try {
                const { className, subject, teacher, numberOfStudent, monthlyFee, schedule, instituteId } = req.body;
                const validInstituteId = (instituteId && instituteId.length === 24) ? instituteId : null;
                const newMongoClass = await MongoClass.create({
                    className,
                    subject,
                    teacher,
                    numberOfStudent: numberOfStudent || 0,
                    monthlyFee,
                    schedule,
                    instituteId: validInstituteId
                });
                return res.status(201).json({ ...newMongoClass._doc, persisting: 'MongoDB' });
            } catch (mongoErr) {
                return res.status(503).json({ message: 'Database connection failed.', error: mongoErr.message });
            }
        }
        res.status(500).json({ message: err.message });
    }
};

exports.getClasses = async (req, res) => {
    try {
        const classes = await Class.findAll();
        // Since SQL mapping might be needed for UI too, keeping as is primarily but UI can sort it out.
        res.status(200).json(classes);
    } catch (err) {
        const isConnectionError = err.name?.includes('SequelizeConnection') || err.message?.includes('ECONNREFUSED') || err.message?.includes('ConnectionError');
        if (isConnectionError) {
            try {
                const classes = await MongoClass.find();
                const formatted = classes.map(c => ({
                    ...(c._doc || c),
                    id: c._id.toString(),
                    _id: c._id.toString(),
                    name: c.className,
                    subject: c.subject,
                    teacher: c.teacher,
                    students: c.numberOfStudent,
                    fee: c.monthlyFee,
                    schedule: c.schedule
                }));
                return res.status(200).json(formatted);
            } catch (mongoErr) {
                return res.status(503).json({ message: 'Database connection failed.' });
            }
        }
        res.status(500).json({ message: err.message });
    }
};

// Edit/Delete
exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByPk(id);
        if (student) {
            await User.destroy({ where: { id: student.userId } });
            await student.destroy();
        }
        res.json({ message: 'Student deleted' });
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.recordPayment = async (req, res) => {
    try {
        const { studentUserId, classId, amount, month, status, paymentDate, instituteId } = req.body;
        const slipUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const payment = await Payment.create({
            instituteId,
            studentUserId,
            classId,
            amount,
            month,
            status,
            paymentDate,
            slipUrl
        });

        res.status(201).json(payment);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.postAnnouncement = async (req, res) => {
    try {
        const { title, content, targetRole, instituteId } = req.body;
        const announcement = await Announcement.create({
            instituteId, title, content, targetRole
        });
        res.status(201).json(announcement);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.findAll({ order: [['createdAt', 'DESC']] });
        res.json(announcements);
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await Teacher.findByPk(id);
        if (teacher) {
            await User.destroy({ where: { id: teacher.userId } });
            await teacher.destroy();
        }
        res.json({ message: 'Teacher deleted' });
    } catch (err) {
        // Fallback to MongoDB if SQL fails or is unavailable
        try {
            await MongoTeacher.findByIdAndDelete(req.params.id);
            return res.json({ message: 'Teacher removed from MongoDB' });
        } catch (mongoErr) {
            return res.status(500).json({ message: err.message || mongoErr.message });
        }
    }
};

exports.getTeacherById = async (req, res) => {
    const { id } = req.params;
    console.log(`[BACKEND] Fetching teacher details for ID: ${id}`);
    let teacher;

    try {
        // Try PostgreSQL first
        if (id && id.length > 24) { // Likely UUID
            teacher = await Teacher.findByPk(id, { include: [User] });
        }
    } catch (sqlErr) {
        console.log(`SQL fetch failed for ID [${id}], fallback to MongoDB...`);
    }

    if (teacher) {
        console.log(`[BACKEND] Found teacher [${teacher.User?.name}] in SQL.`);
        return res.status(200).json({
            ...teacher.toJSON(),
            name: teacher.User ? teacher.User.name : 'Unknown',
            email: teacher.User ? teacher.User.email : '',
            phone: teacher.User ? teacher.User.phone : '',
            subject: teacher.specialization,
            salary: teacher.salary
        });
    }

    // Try MongoDB Fallback
    try {
        console.log(`[BACKEND] Checking MongoDB for teacher ID: ${id}`);
        // If it looks like a Mongo ID or if SQL failed
        const mongoTeacher = await MongoTeacher.findById(id).populate('userId');
        if (mongoTeacher) {
            console.log(`[BACKEND] Found teacher [${mongoTeacher.name}] in MongoDB.`);
            return res.status(200).json({
                ...mongoTeacher._doc,
                id: mongoTeacher._id.toString(),
                name: mongoTeacher.name,
                phone: mongoTeacher.phoneNumber,
                salary: mongoTeacher.monthlySalary,
                email: mongoTeacher.email || (mongoTeacher.userId && typeof mongoTeacher.userId === 'object' ? mongoTeacher.userId.email : '')
            });
        }
    } catch (mongoErr) {
        console.error(`[BACKEND] MongoDB Detail Fetch Failed for ${id}:`, mongoErr.message);
    }

    console.log(`[BACKEND] Teacher not found for ID: ${id}`);
    return res.status(404).json({ message: 'Teacher not found across all database engines.' });
};

exports.getStudentById = async (req, res) => {
    const { id } = req.params;
    console.log(`[BACKEND] Fetching student details for ID: ${id}`);
    let student;

    try {
        // Try PostgreSQL first
        if (id && id.length > 24) {
            student = await Student.findByPk(id, { include: [User] });
        }
    } catch (sqlErr) {
        console.log(`SQL student fetch failed for ID [${id}], fallback to MongoDB...`);
    }

    if (student) {
        console.log(`[BACKEND] Found student [${student.User?.name}] in SQL.`);
        return res.status(200).json({
            ...student.toJSON(),
            name: student.User ? student.User.name : 'Unknown',
            email: student.User ? student.User.email : '',
            parent: student.parentName,
            phone: student.parentNumber,
            className: student.currentClassId
        });
    }

    // Try MongoDB Fallback
    try {
        console.log(`[BACKEND] Checking MongoDB for student ID: ${id}`);
        const mongoStudent = await MongoStudent.findById(id);
        if (mongoStudent) {
            console.log(`[BACKEND] Found student [${mongoStudent.name}] in MongoDB.`);
            return res.status(200).json({
                ...mongoStudent._doc,
                id: mongoStudent._id.toString(),
                name: mongoStudent.name,
                parent: mongoStudent.parentName,
                phone: mongoStudent.parentNumber,
                className: mongoStudent.className
            });
        }
    } catch (mongoErr) {
        console.error(`[BACKEND] MongoDB Student Detail Fetch Failed for ${id}:`, mongoErr.message);
    }

    console.log(`[BACKEND] Student not found for ID: ${id}`);
    return res.status(404).json({ message: 'Student not found across all database engines.' });
};

exports.getClassById = async (req, res) => {
    const { id } = req.params;
    console.log(`[BACKEND] Fetching class details for ID: ${id}`);
    let classData;

    try {
        if (id && id.length > 24) {
            classData = await Class.findByPk(id);
        }
    } catch (sqlErr) {
        console.log(`SQL class fetch failed for ID [${id}], fallback to MongoDB...`);
    }

    if (classData) {
        console.log(`[BACKEND] Found class [${classData.name}] in SQL.`);
        return res.status(200).json({
            ...classData.toJSON(),
            name: classData.name,
            subject: classData.subject,
            teacher: classData.teacherId, // Ideally join to get teacher name, but keeping it simple as we don't have it joined here
            students: 0,
            fee: classData.fee,
            schedule: classData.schedule
        });
    }

    // Fallback to MongoDB
    try {
        console.log(`[BACKEND] Checking MongoDB for class ID: ${id}`);
        const mongoClass = await MongoClass.findById(id);
        if (mongoClass) {
            console.log(`[BACKEND] Found class [${mongoClass.className}] in MongoDB.`);
            return res.status(200).json({
                ...mongoClass._doc,
                id: mongoClass._id.toString(),
                name: mongoClass.className,
                subject: mongoClass.subject,
                teacher: mongoClass.teacher,
                students: mongoClass.numberOfStudent,
                fee: mongoClass.monthlyFee,
                schedule: mongoClass.schedule
            });
        }
    } catch (mongoErr) {
        console.error(`[BACKEND] MongoDB Class Detail Fetch Failed for ${id}:`, mongoErr.message);
    }

    console.log(`[BACKEND] Class not found for ID: ${id}`);
    return res.status(404).json({ message: 'Class not found across all database engines.' });
};
