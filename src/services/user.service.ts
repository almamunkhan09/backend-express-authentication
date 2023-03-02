import UserModel, { UserDocument } from '../models/user.model';

export async function createUser(input: UserDocument) {
  try {
    return await UserModel.create(input);
  } catch (err: any) {
    throw new Error(err);
  }
}