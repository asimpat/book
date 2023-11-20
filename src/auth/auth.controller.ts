import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { LoginUpDto } from './dto/login.dto';
import { User } from './schema/user.schema';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService:UserService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }
    
    @Get('login')
    loginUser(@Body() loginDto: LoginUpDto): Promise<{ token: string; }>{
        return this.authService.loginUser(loginDto)
    }

    @Get('users')
    getAllUsers(): Promise<User[]>{
        return this.userService.getAllUsers()
    }

    @Get('users/:id')
    getUserProfile(@Param('id') id: string): Promise<User>{
        return this.userService.getUserProfile(id)
    }
}
