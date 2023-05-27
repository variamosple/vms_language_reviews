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
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'variamos',
      entities: [LanguageReview, Reviewer, Comment],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
