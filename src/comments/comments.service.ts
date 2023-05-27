import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) { }

  create(createComment: Comment) {
    return this.commentsRepository.insert(createComment);
  }

  findAll() {
    return this.commentsRepository.find();
  }

  findOne(id: number) {
    return this.commentsRepository.findOneBy({ id });
  }

  update(id: number, updateComment: Comment) {
    return this.commentsRepository.update({ id }, updateComment);
  }

  remove(id: number) {
    return this.commentsRepository.delete(id);
  }
}
