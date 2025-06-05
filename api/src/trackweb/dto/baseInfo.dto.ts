import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsObject } from 'class-validator';
export class BaseInfoDto {
  @ApiProperty({ description: '网页可见区高度' })
  @IsNumber()
  @IsOptional()
  clientHeight?: number;

  @ApiProperty({ description: '网页可见区宽度' })
  @IsNumber()
  @IsOptional()
  clientWidth?: number;

  @ApiProperty({ description: '显示屏幕调色板的比特深度' })
  @IsNumber()
  @IsOptional()
  colorDepth?: number;

  @ApiProperty({ description: '显示屏幕的颜色分辨率' })
  @IsNumber()
  @IsOptional()
  pixelDepth?: number;

  @ApiProperty({ description: '设备ID' })
  @IsString()
  @IsOptional()
  deviceId?: string;

  @ApiProperty({ description: '显示屏幕的宽度' })
  @IsNumber()
  @IsOptional()
  screenWidth?: number;

  @ApiProperty({ description: '显示屏幕的高度' })
  @IsNumber()
  @IsOptional()
  screenHeight?: number;

  @ApiProperty({ description: '浏览器厂商' })
  @IsString()
  @IsOptional()
  vendor?: string;

  @ApiProperty({ description: '平台信息' })
  @IsString()
  @IsOptional()
  platform?: string;

  @ApiProperty({ description: '用户UUID' })
  @IsString()
  @IsOptional()
  userUuid?: string;

  @ApiProperty({ description: '用户名' })
  @IsString()
  @IsOptional()
  userName?: string;

  @ApiProperty({ description: 'SDK用户UUID' })
  @IsString()
  @IsOptional()
  sdkUserUuid?: string;

  @ApiProperty({ description: '应用名称' })
  @IsString()
  @IsOptional()
  appName?: string;

  @ApiProperty({ description: '应用代码' })
  @IsString()
  @IsOptional()
  appCode?: string;

  @ApiProperty({ description: '页面ID' })
  @IsString()
  @IsOptional()
  pageId?: string;

  @ApiProperty({ description: '会话ID' })
  @IsString()
  @IsOptional()
  sessionId?: string;

  @ApiProperty({ description: 'SDK版本' })
  @IsString()
  @IsOptional()
  sdkVersion?: string;

  @ApiProperty({ description: 'IP地址' })
  @IsString()
  @IsOptional()
  ip?: string;

  @ApiProperty({ description: '发送时间' })
  @IsNumber()
  @IsOptional()
  sendTime?: number;

  @ApiProperty({ description: '扩展字段' })
  @IsObject()
  @IsOptional()
  ext?: Record<string, unknown>;
}
