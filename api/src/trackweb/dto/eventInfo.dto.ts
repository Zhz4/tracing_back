import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class EventInfoDto {
  @ApiProperty({ description: '事件ID' })
  @IsString()
  @IsOptional()
  eventId?: string;

  @ApiProperty({ description: '事件类型' })
  @IsString()
  @IsOptional()
  eventType?: string;

  @ApiProperty({ description: '事件发生时间' })
  @IsNumber()
  @IsOptional()
  triggerTime?: number;

  @ApiProperty({ description: '发送时间' })
  @IsNumber()
  @IsOptional()
  sendTime?: number;

  @ApiProperty({ description: '当前页面URL' })
  @IsString()
  @IsOptional()
  triggerPageUrl?: string;

  @ApiProperty({ description: '事件名' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: '事件参数' })
  @IsObject()
  @IsOptional()
  params?: Record<string, unknown>;

  @ApiProperty({ description: '被点击元素的层级' })
  @IsString()
  @IsOptional()
  elementPath?: string;

  @ApiProperty({ description: '被点击元素与屏幕左边距离' })
  @IsNumber()
  @IsOptional()
  x?: number;

  @ApiProperty({ description: '被点击元素与屏幕上边距离' })
  @IsNumber()
  @IsOptional()
  y?: number;

  @ApiProperty({ description: '错误信息' })
  @IsString()
  @IsOptional()
  errMessage?: string;

  @ApiProperty({ description: '错误的完整信息' })
  @IsString()
  @IsOptional()
  errStack?: string;

  @ApiProperty({ description: '错误发生行号' })
  @IsNumber()
  @IsOptional()
  line?: number;

  @ApiProperty({ description: '错误发生列号' })
  @IsNumber()
  @IsOptional()
  col?: number;

  @ApiProperty({ description: '错误录屏信息' })
  @IsString()
  @IsOptional()
  recordscreen?: string;

  @ApiProperty({ description: '上级页面URL' })
  @IsString()
  @IsOptional()
  referer?: string;

  @ApiProperty({ description: '页面加载来源' })
  @IsString()
  @IsOptional()
  action?: string;

  @ApiProperty({ description: '停留时间' })
  @IsNumber()
  @IsOptional()
  durationTime?: number;

  @ApiProperty({ description: '请求URL' })
  @IsString()
  @IsOptional()
  requestUrl?: string;

  @ApiProperty({ description: '请求方法' })
  @IsString()
  @IsOptional()
  requestMethod?: string;

  @ApiProperty({ description: '请求类型' })
  @IsString()
  @IsOptional()
  requestType?: string;

  @ApiProperty({ description: '请求返回状态码' })
  @IsNumber()
  @IsOptional()
  responseStatus?: number;

  @ApiProperty({ description: '请求耗时' })
  @IsNumber()
  @IsOptional()
  duration?: number;

  @ApiProperty({ description: '资源信息' })
  @IsNumber()
  @IsOptional()
  appcache?: number;

  @ApiProperty({ description: 'dom解析耗时' })
  @IsNumber()
  @IsOptional()
  dom?: number;

  @ApiProperty({ description: 'dns查询耗时' })
  @IsNumber()
  @IsOptional()
  dns?: number;

  @ApiProperty({ description: '首包时间' })
  @IsNumber()
  @IsOptional()
  firstbyte?: number;

  @ApiProperty({ description: '首屏时间' })
  @IsNumber()
  @IsOptional()
  fmp?: number;

  @ApiProperty({ description: '页面完全加载时间' })
  @IsNumber()
  @IsOptional()
  loadon?: number;

  @ApiProperty({ description: 'HTML加载完成时间' })
  @IsNumber()
  @IsOptional()
  ready?: number;

  @ApiProperty({ description: '同步资源加载耗时' })
  @IsNumber()
  @IsOptional()
  res?: number;

  @ApiProperty({ description: 'SSL安全连接耗时' })
  @IsNumber()
  @IsOptional()
  ssllink?: number;

  @ApiProperty({ description: 'TCP连接耗时' })
  @IsNumber()
  @IsOptional()
  tcp?: number;

  @ApiProperty({ description: '内容传输耗时' })
  @IsNumber()
  @IsOptional()
  trans?: number;

  @ApiProperty({ description: '请求响应耗时' })
  @IsNumber()
  @IsOptional()
  ttfb?: number;

  @ApiProperty({ description: '首次可交互时间' })
  @IsNumber()
  @IsOptional()
  tti?: number;

  @ApiProperty({ description: '重定向时间' })
  @IsNumber()
  @IsOptional()
  redirect?: number;

  @ApiProperty({ description: '上一个页面的卸载耗时' })
  @IsNumber()
  @IsOptional()
  unloadTime?: number;

  @ApiProperty({ description: '通过某种方式请求的资源,比如script,link' })
  @IsString()
  @IsOptional()
  initiatorType?: string;

  @ApiProperty({ description: '传输的数据包大小' })
  @IsNumber()
  @IsOptional()
  transferSize?: number;

  @ApiProperty({ description: '数据包压缩后大小' })
  @IsNumber()
  @IsOptional()
  encodedBodySize?: number;

  @ApiProperty({ description: '数据包解压后大小' })
  @IsNumber()
  @IsOptional()
  decodedBodySize?: number;

  @ApiProperty({ description: '重定向开始时间' })
  @IsNumber()
  @IsOptional()
  redirectStart?: number;

  @ApiProperty({ description: '重定向结束时间' })
  @IsNumber()
  @IsOptional()
  redirectEnd?: number;

  @ApiProperty({ description: '开始时间' })
  @IsNumber()
  @IsOptional()
  startTime?: number;

  @ApiProperty({ description: '开始发起请求时间' })
  @IsNumber()
  @IsOptional()
  fetchStart?: number;

  @ApiProperty({ description: 'DNS开始解析时间' })
  @IsNumber()
  @IsOptional()
  domainLookupStart?: number;

  @ApiProperty({ description: 'DNS结束解析时间' })
  @IsNumber()
  @IsOptional()
  domainLookupEnd?: number;

  @ApiProperty({ description: '连接开始时间' })
  @IsNumber()
  @IsOptional()
  connectStart?: number;

  @ApiProperty({ description: '连接建立完成时间' })
  @IsNumber()
  @IsOptional()
  connectEnd?: number;

  @ApiProperty({ description: '开始发送数据包时间' })
  @IsNumber()
  @IsOptional()
  requestStart?: number;

  @ApiProperty({ description: '开始接收数据包时间' })
  @IsNumber()
  @IsOptional()
  responseStart?: number;

  @ApiProperty({ description: '数据包接收完成时间' })
  @IsNumber()
  @IsOptional()
  responseEnd?: number;
}
