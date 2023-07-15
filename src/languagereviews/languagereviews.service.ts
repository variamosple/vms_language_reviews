import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageReview } from './entities/languagereview.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LanguagereviewsService {
  constructor(
    @InjectRepository(LanguageReview)
    private languageReviewRepository: Repository<LanguageReview>,
  ) {}

  create(createLanguageReview: LanguageReview) {
    return this.languageReviewRepository.insert(createLanguageReview);
  }

  findAll() {
    return this.languageReviewRepository.find({
      relations: ['reviewers'],
    });
  }

  findOne(id: number) {
    return this.languageReviewRepository.findOneBy({ id });
  }

  findByLanguageId(languageId: number) {
    return this.languageReviewRepository.findOne({
      where: { languageId },
      relations: ['reviewers'],
    });
  }

  update(id: number, updateLanguageReviewDto: LanguageReview) {
    return this.languageReviewRepository.update(
      { id },
      updateLanguageReviewDto,
    );
  }

  remove(id: number) {
    return this.languageReviewRepository.delete(id);
  }
}
