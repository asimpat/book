import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  async getUserProfile(id: string) {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter correct id');
    }
    const userProfile = await this.userModel.findById(id);

    return userProfile;
  }
}
