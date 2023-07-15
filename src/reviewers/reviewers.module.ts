import { Module } from '@nestjs/common';
import { ReviewersService } from './reviewers.service';
import { ReviewersController } from './reviewers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reviewer } from './entities/reviewer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reviewer])],
  exports: [TypeOrmModule],
  controllers: [ReviewersController],
  providers: [ReviewersService],
})
export class ReviewersModule {}
