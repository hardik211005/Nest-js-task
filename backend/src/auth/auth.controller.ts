import {
  Controller,
  Post,
  Body,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  // 🟢 SIGNUP
  @Post('signup')
  async signup(@Body() body: any, @Res() res: Response) {
    const { email, password } = body;

    if (!email || !email.includes('@')) {
      throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
    }

    if (!password || password.length < 6) {
      throw new HttpException('Weak password', HttpStatus.BAD_REQUEST);
    }

    await this.auth.signup(email, password);

    const accessToken = this.auth.signToken(
      { email },
      'ACCESS',
      15 * 60,
    );

    const refreshToken = this.auth.signToken(
      { email },
      'REFRESH',
      7 * 24 * 60 * 60,
    );

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
    });

    return res.json({ accessToken });
  }

  // 🔵 SIGNIN
  @Post('signin')
  async signin(@Body() body: any, @Res() res: Response) {
    const { email, password } = body;

    const user = await this.auth.findUser(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const valid = this.auth.verifyPassword(
      password,
      user.password_hash,
    );

    if (!valid) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const accessToken = this.auth.signToken(
      { email },
      'ACCESS',
      15 * 60,
    );

    const refreshToken = this.auth.signToken(
      { email },
      'REFRESH',
      7 * 24 * 60 * 60,
    );

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
    });

    return res.json({ accessToken });
  }
}
