import { Injectable } from '@nestjs/common';
import { Reviewer } from './entities/reviewer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReviewersService {
  constructor(
    @InjectRepository(Reviewer)
    private reviewerRepository: Repository<Reviewer>,
  ) {}

  create(createReviewer: Reviewer) {
    return this.reviewerRepository.insert(createReviewer);
  }

  createMany(createReviewers: Reviewer[]) {
    return this.reviewerRepository.insert(createReviewers);
  }

  findAll() {
    return this.reviewerRepository.find();
  }

  findOne(id: number) {
    return this.reviewerRepository.findOneBy({ id });
  }

  update(id: number, updateReviewer: Reviewer) {
    return this.reviewerRepository.update({ id }, updateReviewer);
  }

  remove(id: number) {
    return this.reviewerRepository.delete(id);
  }
}
