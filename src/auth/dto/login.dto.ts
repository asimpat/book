import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class LoginUpDto {
  @IsOptional()
  @IsString()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsOptional()
  @MinLength(6)
  readonly password: number;
}
