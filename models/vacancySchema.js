const mongoose = require('mongoose');

const VacancySchema = new mongoose.Schema({
    jobField: {
        type: String,
        required: true
    },
    jobPosition: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required: true
    },
    dueDate:{
        type: Date,
        required: true
    },
    workLocation:{
        type: String,
        required: true
    },
    workType:{
        type: String,
        required: true
    },
    workMethod:{
        type: String,
        required: true
    },
    requiredSkills:{
        type: [String]
    },
    educationalQualifications:{
        type: String,
        required: true
    },
    olSubjects: {
        type: [String], 
        required: function () {
            return this.educationalQualifications === 'ol';
        }
    },
    alSubjects: {
        type: [String],
        required: function () {
            return this.educationalQualifications === 'al';
        }
    },
    undergraduate: {
        type: Boolean,
        required: function () {
            return this.educationalQualifications === 'undergraduate';
        }
    },
    postgraduate: {
        type: Boolean,
        required: function () {
            return this.educationalQualifications === 'postgraduate';
        }
    },
    createdDate:{
        type: Date,
        default: Date.now,
        required: true
    },

})

module.exports = mongoose.model('vacancy',VacancySchema);

