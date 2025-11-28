import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { Cakes } from './entity/cake.entity';
import { CreateCakeDto } from './dto/create.cake.dto';
import { CreateCakeResponse } from './interface/create.cake.response.interface';
import { UpdateCakeDto } from './dto/update.cake.dto';
import { CakesFilterDto } from './dto/cake.filter.dto';

@Injectable()
export class CakesService {
  private cakes: Cakes[] = [];
  getAllCakes(filter: CakesFilterDto): Cakes[] {
    let results = this.cakes;
    if (filter.categoryId) {
      results = results.filter((cake) => cake.categoryId == filter.categoryId);
    }
    if (filter.name) {
      const nameLower = filter.name.toLowerCase();
      results = results.filter((cake) =>
        cake.name.toLowerCase().includes(nameLower),
      );
    }
    if (filter.minPrice) {
      const minPrice = filter.minPrice;
      results = results.filter((cake) => cake.price >= minPrice);
    }
    if (filter.maxPrice) {
      const maxPrice = filter.maxPrice;
      results = results.filter((cake) => cake.price <= maxPrice);
    }
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      results = results.filter(
        (cake) =>
          cake.name.toLowerCase().includes(searchLower) ||
          cake.description.toLowerCase().includes(searchLower),
      );
    }
    if (filter.limit && filter.page) {
      const limit = filter.limit;
      const page = filter.page;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      results = results.slice(startIndex, endIndex);
    }
    return results;
  }
  getCakeById(id: number): Cakes {
    const cake = this.cakes.find((cake: UpdateCakeDto) => cake.id === id);
    if (!cake) {
      throw new HttpException(
        `Cake with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return cake;
  }
  createCake(createCakeDto: CreateCakeDto): CreateCakeResponse {
    const newCake = { id: Date.now(), ...createCakeDto } as Cakes;
    this.cakes.push(newCake);
    return { newCake, message: `${newCake.name} is created successfully` };
  }
  updateCake(@Param('id') id: number, updateCakeDto: UpdateCakeDto): Cakes {
    const cake = this.cakes.find((c: UpdateCakeDto) => c.id === id);
    if (!cake) {
      throw new HttpException(
        `Cake with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const updatedCake = { ...cake, ...updateCakeDto };
    this.cakes = this.cakes.map((cake: UpdateCakeDto) =>
      cake.id === id ? updatedCake : cake,
    );
    return updatedCake;
  }
  deleteCake(@Param('id') id: number): { message: string } {
    const cake = this.cakes.find((cake: UpdateCakeDto) => cake.id !== id);
    if (!cake) {
      throw new HttpException(
        `Cake with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.cakes = this.cakes.filter((cake: UpdateCakeDto) => cake.id !== id);
    return { message: `Cake with id ${id} has been deleted` };
  }
}
