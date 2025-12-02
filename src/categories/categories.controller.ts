import { Controller, Get, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CategoriesDto } from './dto/categories.dto';
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Get()
  getCategories(): CategoriesDto[] {
    return this.categoriesService.getAllCategories();
  }
  @Post()
  createCategories(@Body() body: CategoriesDto) {
    return this.categoriesService.createCategories(body);
  }
}
