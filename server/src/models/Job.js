import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const JobSchema = new Schema(
    {
        userId: {
            type: String,
            trim: true,
            require: true,
        },
        jobTitle: {
            type: String,
            trim: true,
            require: true,
            default: '',
        },
        jobDesc: {
            type: String,
            trim: true,
            require: true,
            default: '',
        },
        jobPosition: {
            type: String,
            trim: true,
            require: true,
            default: '',
        },
        jobCareers: {
            type: Array,
            trim: true,
            require: true,
            default: [],
        },
        jobSkills: {
            type: Array,
            trim: true,
            require: true,
            default: [],
        },
        jobExp: {
            type: String,
            trim: true,
            require: true,
            default: '',
        },
        jobSalaryRange: {
            type: String,
            trim: true,
            require: true,
            default: '',
        },
        jobWorkingLocation: {
            type: Array,
            trim: true,
            require: true,
            default: [],
        },
        jobApplicants: {
            type: Array,
            default: [],
        },
        jobDeadline: {
            type: String,
            trim: true,
            default: '',
        },
        jobStatus: {
            type: String,
            trim: true,
            default: 'Đang tuyển',
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Job', JobSchema);
