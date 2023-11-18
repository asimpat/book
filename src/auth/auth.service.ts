import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { LoginUpDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    // get name, email, password from the signUpDto
    const { name, email, password } = signUpDto;
    // hashPsaaword before sending to the database
    const hashPsaaword = await bcrypt.hash(password, 10);

    //   save user in the database
    const user = await this.userModel.create({
      name,
      email,
      password: hashPsaaword,
    });

    //   assiged jwt token to the user
    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async loginUser(loginDto: LoginUpDto): Promise<{ token: string }> {
    // get email, password from the loginDto
    const { email, password } = loginDto;

    // check if user exist or not
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('invalid email or password');
    }
    //   if user exsit
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('invalid email or password');
    }
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
}
