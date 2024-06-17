import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const JobSaveSchema = new Schema(
    {
        userId: {
            type: String,
            trim: true,
            require: true,
        },
        totalJobs: {
            type: Array,
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('JobSave', JobSaveSchema);
