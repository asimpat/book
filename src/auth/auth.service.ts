import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { LoginUpDto } from './dto/login.dto';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService, private mailerService:MailerService
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
    
     async generateResetToken(id: string): Promise<string> {
    const payload = { id };
    const token = this.jwtService.sign(payload, { expiresIn: '1d' });
    return token;
  
  }
    
      async verifyResetToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch (error) {
      // Handle token verification errors
      throw new Error('Invalid reset token');
    }
      }
    
  async updatePassword(userId: any, newPassword: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { password: newPassword });
  }

    
    async forgotPassword(email: string):Promise<void> {
        const isEmail = await this.userModel.findOne({ email })
        
        if (!isEmail) {
            throw new UnauthorizedException('user not found')
        }

      const token = await this.generateResetToken(isEmail.id) 
        try {
            return await this.mailerService.sendMail(email, 'Password Reset', `Password reset ${token}`);
    } catch (error) {
      throw new HttpException('Failed to send reset email', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }

    async resetPassword(token: string, password: string) {
      const userId = this.jwtService.verify(token)
      if (!userId) {
         throw new UnauthorizedException('Invalid reset token');
      }

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Update the user's password
    await this.updatePassword(userId, password);
  }
}


