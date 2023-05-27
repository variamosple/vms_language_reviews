import { Test, TestingModule } from '@nestjs/testing';
import { LanguagereviewsService } from './languagereviews.service';

describe('LanguagereviewsService', () => {
  let service: LanguagereviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LanguagereviewsService],
    }).compile();

    service = module.get<LanguagereviewsService>(LanguagereviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
