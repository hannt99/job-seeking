import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const JobSchema = new Schema(
    {
        companyId: {
            type: Schema.Types.ObjectId,
            ref: 'Company',
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
        jobType: {
            type: String,
            trim: true,
            require: true,
            default: '',
        },
        jobCareers: {
            type: String,
            trim: true,
            require: true,
            default: '',
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
        jobApplicants: [
            {
                status: String,
                appliedTime: Number,
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
                coverLetter: String,
                cvPath: String,
            },
        ],
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
        companyAvatar: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Job', JobSchema);
