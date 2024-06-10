import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CompanySchema = new Schema(
    {
        userId: {
            type: String,
            trim: true,
            require: true,
            unique: true,
        },
        companyName: {
            type: String,
            trim: true,
            require: true,
            unique: true,
        },
        companyAddress: {
            type: Object,
            trim: true,
            require: true,
        },
        companySize: {
            type: Number,
            require: true,
        },
        position: {
            type: String,
            trim: true,
            require: true,
        },
        introduction: {
            type: String,
            trim: true,
            default: '',
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Company', CompanySchema);
