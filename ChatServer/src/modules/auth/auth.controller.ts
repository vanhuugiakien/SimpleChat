import { Get, UseGuards, Request } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  async login(@Body() user: any) {
    try {
      const result = await this.authService.login(user);
      return {
        data: result,
      };
    } catch (err) {
      return {
        error: err.message,
      };
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async profile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/username')
  async getUserByUsername(@Body() user: any) {
    try {
      const { password, ...result } = await this.authService.getUserByUsername(
        user.username,
      );
      password;
      return {
        data: result,
      };
    } catch (err) {
      return {
        error: err.message,
      };
    }
  }
}
