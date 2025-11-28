import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cakes } from './entity/cake.entity';
import { CreateCakeDto } from './dto/create.cake.dto';
import { CreateCakeResponse } from './interface/create.cake.response.interface';
import { UpdateCakeDto } from './dto/update.cake.dto';
import { CakesFilterDto } from './dto/cake.filter.dto';

@Injectable()
export class CakesService {
  private cakes: Cakes[] = [];
  getAllCakes(filter: CakesFilterDto): {
    total: number;
    page: number;
    limit: number;
    data: Cakes[];
  } {
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
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;
    const start = (page - 1) * limit;
    const end = start + limit;
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      results = results.filter(
        (cake) =>
          cake.name.toLowerCase().includes(searchLower) ||
          cake.description.toLowerCase().includes(searchLower),
      );
    }
    if (filter.limit && filter.page) {
      const limit = filter.limit ?? 10;
      const page = filter.page ?? 1;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      results = results.slice(startIndex, endIndex);
    }
    return {
      total: results.length,
      page,
      limit,
      data: results.slice(start, end),
    };
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
  updateCake(id: number, updateCakeDto: UpdateCakeDto): Cakes {
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
  deleteCake(id: number): { message: string } {
    const cake = this.cakes.find((cake: UpdateCakeDto) => cake.id === id);
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
