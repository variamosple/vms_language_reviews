import { Module } from '@nestjs/common';
import { LanguagereviewsService } from './languagereviews.service';
import { LanguagereviewsController } from './languagereviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageReview } from './entities/languagereview.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageReview])],
  exports: [TypeOrmModule],
  controllers: [LanguagereviewsController],
  providers: [LanguagereviewsService],
})
export class LanguagereviewsModule {}
