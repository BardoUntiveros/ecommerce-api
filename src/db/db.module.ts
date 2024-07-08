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
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        database: configService.get<string>('POSTGRES_DB'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
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
