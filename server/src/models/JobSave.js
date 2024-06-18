import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const JobSaveSchema = new Schema(
    {
        userId: {
            type: String,
            trim: true,
            require: true,
        },
        totalJobs: [{ saveTime: String, jobId: { type: Schema.Types.ObjectId, ref: 'Job' } }],
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('JobSave', JobSaveSchema);
