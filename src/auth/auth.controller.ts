import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Admin } from 'src/admin/admin.interface';
import CreateAdminDto from 'src/admin/dto/create-admin.dto';
import { CurrentUserInterceptor } from './user.interceptor';

@Controller('auth')
@UseInterceptors(CurrentUserInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('me')
  async me(@Request() req): Promise<Admin | undefined> {
    console.log(req.user);
    return this.authService.getMe(req.user);
  }

  @Post('register')
  async register(@Body() newUser: CreateAdminDto): Promise<Admin> {
    return this.authService.register(newUser);
  }

  @Post('login')
  async login(@Body() loginDto: LoginAuthDto) {
    return this.authService.login(loginDto);
  }
}
