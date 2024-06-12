import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const JobSchema = new Schema(
    {
        userId: {
            type: String,
            trim: true,
            require: true,
            unique: true,
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
        jobCareer: {
            type: Array,
            trim: true,
            require: true,
            default: [],
        },
        jobSkill: {
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
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Job', JobSchema);
