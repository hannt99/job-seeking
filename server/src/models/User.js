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
        phone: {
            type: String,
            trim: true,
            default: '',
        },
        avatar: {
            type: String,
            trim: true,
            default:
                'https://png.pngtree.com/png-vector/20220608/ourmid/pngtree-man-avatar-isolated-on-white-background-png-image_4891418.png',
        },
        isActived: {
            type: Boolean,
            default: false,
        },
        role: {
            type: Number,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('User', UserSchema);
