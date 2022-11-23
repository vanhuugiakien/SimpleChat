import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      password;
      return result;
    }
    throw new Error('Invalid username or password');
  }

  async login(user: any) {
    const payload = await this.validateUser(user.username, user.password);
    return {
      username: user.username,
      id: payload.id,
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUserByUsername(username: string) {
    return await this.usersService.findOne(username);
  }
}
