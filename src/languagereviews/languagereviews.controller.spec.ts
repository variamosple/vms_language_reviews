import { Test, TestingModule } from '@nestjs/testing';
import { LanguagereviewsController } from './languagereviews.controller';
import { LanguagereviewsService } from './languagereviews.service';

describe('LanguagereviewsController', () => {
  let controller: LanguagereviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LanguagereviewsController],
      providers: [LanguagereviewsService],
    }).compile();

    controller = module.get<LanguagereviewsController>(
      LanguagereviewsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
