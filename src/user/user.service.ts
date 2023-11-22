import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAllUsers(): Promise<User[]> {
    const user = await this.userModel.find();
    return user;
  }

  async getUserProfile(id: string): Promise<User> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('id is incorrect, Please enter correct id');
    }
    const userProfile = await this.userModel.findById(id);

    return userProfile;
  }

  async getProfile(id: string) {}
}
