import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewersService } from './reviewers.service';
import { Reviewer } from './entities/reviewer.entity';

@Controller('reviewers')
export class ReviewersController {
  constructor(private readonly reviewersService: ReviewersService) {}

  @Post()
  create(@Body() createReviewerDto: Reviewer) {
    return this.reviewersService.create(createReviewerDto);
  }

  @Post('/bulk')
  createMany(@Body() createReviewersDto: Reviewer[]) {
    return this.reviewersService.createMany(createReviewersDto);
  }

  @Get()
  findAll() {
    return this.reviewersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewerDto: Reviewer) {
    return this.reviewersService.update(+id, updateReviewerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewersService.remove(+id);
  }
}
