import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';

@ApiTags('用户认证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: '注册' })
  @Post('register')
  register(@Body() dto: RegisterAuthDto) {
    return this.authService.register(dto);
  }

  @Public()
  @ApiOperation({ summary: '登录' })
  @Post('login')
  login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }
}
