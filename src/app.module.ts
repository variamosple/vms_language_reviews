import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewersModule } from './reviewers/reviewers.module';
import { LanguagereviewsModule } from './languagereviews/languagereviews.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageReview } from './languagereviews/entities/languagereview.entity';
import { Reviewer } from './reviewers/entities/reviewer.entity';
import { Comment } from './comments/entities/comment.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

function requireConfig(configService: ConfigService, key: string): string {
  const value = configService.get<string>(key);
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: requireConfig(configService, 'DB_HOST'),
        port: configService.get('DB_PORT') || 5432,
        username: requireConfig(configService, 'DB_USER'),
        password: requireConfig(configService, 'DB_PASSWORD'),
        database: configService.get('DB_DATABASE') || 'VariamosDB',
        schema: configService.get('DB_SCHEMA') || 'variamos',
        ssl: configService.get('DB_SSL') === 'true',
        synchronize: false,
        entities: [LanguageReview, Reviewer, Comment, User],
      }),
      inject: [ConfigService],
    }),
    ReviewersModule,
    LanguagereviewsModule,
    CommentsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
