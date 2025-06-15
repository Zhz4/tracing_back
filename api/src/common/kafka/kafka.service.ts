// kafka.service.ts
import {
  Injectable,
  OnModuleInit,
  Logger,
  OnModuleDestroy,
} from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaService.name);
  private kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID || 'track-web',
    brokers: (process.env.KAFKA_BROKERS || 'kafka:9092').split(','),
    connectionTimeout: 10000,
    requestTimeout: 30000,
    retry: {
      initialRetryTime: 100,
      retries: 8,
    },
  });

  private producer = this.kafka.producer();

  async onModuleInit() {
    try {
      this.logger.log('正在连接到Kafka...');
      await this.producer.connect();
      this.logger.log('Kafka连接成功');
    } catch (error) {
      this.logger.error('Kafka连接失败:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.producer.disconnect();
      this.logger.log('Kafka连接已关闭');
    } catch (error) {
      this.logger.error('关闭Kafka连接时出错:', error);
    }
  }

  async sendMessage(topic: string, message: string) {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: message }],
      });
      this.logger.debug(`消息已发送到主题 ${topic}`);
    } catch (error) {
      this.logger.error(`发送消息到主题 ${topic} 失败:`, error);
      throw error;
    }
  }
}
