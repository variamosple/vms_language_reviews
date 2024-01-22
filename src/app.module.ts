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

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host:
          configService.get('DB_HOST') ||
          'variamos-db-2024.postgres.database.azure.com',
        port: configService.get('DB_PORT') || 5432,
        username: configService.get('DB_USER') || 'adminpg',
        password: configService.get('DB_PASSWORD') || '123456',
        database: configService.get('DB_DATABASE') || 'VariamosDB',
        schema: configService.get('DB_SCHEMA') || 'variamos',
        ssl: configService.get('DB_SSL') === 'true',
        synchronize: true,
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
