import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        fullName: {
            type: String,
            trim: true,
            default: '',
        },
        gender: {
            type: String,
            trim: true,
            default: 'Nam',
        },
        birthDate: {
            type: String,
            trim: true,
            default: '',
        },
        phoneNumber: {
            type: String,
            trim: true,
            default: '',
        },
        companyName: {
            type: String,
            trim: true,
            default: '',
        },
        companyAddress: {
            type: String,
            trim: true,
            default: '',
        },
        companySize: {
            type: Number,
            default: 1,
        },
        position: {
            type: String,
            trim: true,
            default: '',
        },
        avatar: {
            type: String,
            trim: true,
            default: '',
        },
        isActived: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('User', UserSchema);
