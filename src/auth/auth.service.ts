import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import CreateAdminDto from 'src/admin/dto/create-admin.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async getMe(user: any) {
    console.log(user);
    if (user) return this.adminService.findOne(user);
    else new HttpException('I dont know you!', HttpStatus.NOT_FOUND);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.adminService.findOneByUsername(username);
    const isPassMatching = await bcrypt.compare(pass, user.password);
    if (user && !isPassMatching) {
      user.password = undefined;
      return user;
    }
    throw new HttpException(
      'Wrong credentials provided',
      HttpStatus.BAD_REQUEST,
    );
  }

  public async register(registrationData: CreateAdminDto) {
    const user = await this.adminService.findOneByUsername(
      registrationData.username,
    );
    if (user)
      throw new HttpException('Username already used', HttpStatus.BAD_REQUEST);
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.adminService.create({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginDto: LoginAuthDto) {
    const { password, username } = loginDto;
    const found = await this.adminService.findOneByUsername(username);
    if (!found) {
      throw new UnauthorizedException("Nom d'utilisateur est incorrect !");
    }

    console.log(await bcrypt.compare(password, found.password));

    if (found && (await bcrypt.compare(password, found.password))) {
      return {
        token: this.jwtService.sign({ username: username }),
        user: found,
      };
    } else {
      console.log('mot de passe errone');
      throw new ConflictException(`Votre mot de passe est incorrect !`);
    }
  }
}
