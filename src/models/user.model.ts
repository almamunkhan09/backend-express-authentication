import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
let saltValue: number;
if (typeof process.env.SALTFACOR === 'string') {
  saltValue = parseInt(process.env.SALTFACOR);
}

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(userInputPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  let user = this as UserDocument;
  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(saltValue);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (
  userInputPassword: string,
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(userInputPassword, user.password).catch((err) => false);
};

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
