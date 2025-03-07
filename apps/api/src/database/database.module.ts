import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const SEQUELIZE_TOKEN = "SEQUELIZE"

export const databaseProviders = [
  {
    provide: SEQUELIZE_TOKEN,
    useFactory: async (configService: ConfigService) => configService.get('database'),
    inject: [ConfigService],
  },
];

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
