import { Injectable } from '@nestjs/common';
import { Categories } from './entity/categories.entity';
import { CategoriesDto } from './dto/categories.dto';

@Injectable()
export class CategoriesService {
  private categories: Categories[] = [];
  getAllCategories() {
    return this.categories;
  }
  createCategories(createCakeDto: CategoriesDto): Categories {
    const existingCategory = this.categories.find(
      (category) =>
        category.name.toLocaleLowerCase() ===
        createCakeDto.name.toLocaleLowerCase(),
    );
    if (existingCategory) {
      throw new Error('Category already exists');
    }
    const newCategory = { id: this.categories.length + 1, ...createCakeDto };
    this.categories.push(newCategory);
    return newCategory;
  }
}
