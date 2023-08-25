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

@Module({
  imports: [
    ReviewersModule,
    LanguagereviewsModule,
    CommentsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'variamos-db-2024.postgres.database.azure.com',
      port: 5432,
      username: 'adminpg',
      password: 'a=m=8hos.G!-s<*M1G',
      database: 'VariamosDB',
      schema: 'variamos',
      ssl: true,
      synchronize: true,
      entities: [LanguageReview, Reviewer, Comment],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
