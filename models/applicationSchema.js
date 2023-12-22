const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    jobPosition: {
        type: String,
        required: true
    },

    jobTitle: {
        type: String,
        required: true 
    },

    nameWithInitials: {
        type: String,
        required: true
    },

    fullName: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    dob: {
        type: Date,
        required: true
    },

    nic: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    landlineNumber: {
        type: String,
    },

    mobileNumber: {
        type: String,
        required: true
    },

    field: {
        type: String,
        required: true
    },

    eduDetails: {
        type: String,
        required: true
    },

    educationalQualifications: {
        type: String,
        required: true
    },

    olSubjects: {
        type: [String],
        required: function () {
            return this.eduDetails === 'ol';
        }
    },

    alSubjects: {
        type: [String],
        required: function () {
            return this.eduDetails === 'al';
        }
    },

    olGrades: {
        type: [String],
        required: function () {
            return this.eduDetails === 'ol';
        }
    },

    alGrades: {
        type: [String],
        required: function () {
            return this.eduDetails === 'al';
        }
    },

    experience: {
        type: String
    },

    extracurricular: {
        type: String
    },

    otherQualifications:{
        type: String
    },

    cvFileDataUrl:{
        type: String,
        required: true
    },

    cvFileName: {
        type: String,
        required: true
    },

    submittedDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending', // default status is pending
    },

    // Reference to User
    user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
})

module.exports = mongoose.model('application', ApplicationSchema);