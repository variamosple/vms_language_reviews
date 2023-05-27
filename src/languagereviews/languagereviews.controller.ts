import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LanguagereviewsService } from './languagereviews.service';
import { LanguageReview } from './entities/languagereview.entity';

@Controller('languagereviews')
export class LanguagereviewsController {
  constructor(
    private readonly languagereviewsService: LanguagereviewsService,
  ) {}

  @Post()
  create(@Body() createLanguagereviewDto: LanguageReview) {
    return this.languagereviewsService.create(createLanguagereviewDto);
  }

  @Get()
  findAll() {
    return this.languagereviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.languagereviewsService.findOne(+id);
  }

  @Get('/language/:languageId')
  findByLanguageId(@Param('languageId') languageId: string) {
    return this.languagereviewsService.findByLanguageId(+languageId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLanguagereviewDto: LanguageReview,
  ) {
    return this.languagereviewsService.update(+id, updateLanguagereviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.languagereviewsService.remove(+id);
  }
}
