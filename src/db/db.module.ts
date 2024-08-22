import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT, 10),
        database: process.env.POSTGRES_DB,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        entities: ['dist/**/*.entity{.ts,.js}'],
        logging: true, // Only for development, should be false in production
        synchronize: false, // Only for development, should be false in production
        dropSchema: false, // Only for development, should be false in production
        migrations: ['src/migrations/*{.ts,.js}'],
      }),
    }),
  ],
})
export class DatabaseModule {}
