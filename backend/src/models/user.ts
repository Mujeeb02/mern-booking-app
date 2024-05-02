import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserType extends Document {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const userSchema: Schema<UserType> = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v: string) {
                return /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(v);
            },
            message: props => `${props.value} is not a valid email address`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

userSchema.pre<UserType>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const User = mongoose.model<UserType>('User', userSchema);

export default User;
