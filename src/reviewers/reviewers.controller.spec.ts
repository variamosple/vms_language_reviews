import { Test, TestingModule } from '@nestjs/testing';
import { ReviewersController } from './reviewers.controller';
import { ReviewersService } from './reviewers.service';

describe('ReviewersController', () => {
  let controller: ReviewersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewersController],
      providers: [ReviewersService],
    }).compile();

    controller = module.get<ReviewersController>(ReviewersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
