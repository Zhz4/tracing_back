import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('未找到用户');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('密码错误');

    return user;
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.validateUser(
      loginAuthDto.email,
      loginAuthDto.password,
    );
    if (!user) throw new UnauthorizedException('用户名或密码错误');
    const payload = {
      email: loginAuthDto.email,
      sub: loginAuthDto.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: RegisterAuthDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: { ...dto, password: hashed },
    });
    return user;
  }
}
