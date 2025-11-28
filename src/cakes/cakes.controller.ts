import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CakesService } from './cakes.service';
import { Cakes } from './entity/cake.entity';
import { CreateCakeDto } from './dto/create.cake.dto';
import { UpdateCakeDto } from './dto/update.cake.dto';

@ApiTags('cakes')
@Controller('cakes')
export class CakesController {
  constructor(private cakeService: CakesService) {}
  @Get()
  getCakes(
    @Query('categoryId') categoryId?: number,
    @Query('name') name?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('search') search?: string,
  ): Cakes[] {
    return this.cakeService.getAllCakes({
      categoryId,
      name,
      minPrice,
      maxPrice,
      search,
    });
  }
  @Get(':id')
  getCakesById(@Param('id') id: string): Cakes {
    return this.cakeService.getCakeById(Number(id));
  }
  @Post()
  createCake(@Body() body: CreateCakeDto) {
    return this.cakeService.createCake(body);
  }
  @Put(':id')
  updateCake(@Param('id') id: string, @Body() body: UpdateCakeDto): Cakes {
    return this.cakeService.updateCake(+id, body);
  }
  @Delete(':id')
  deleteCake(@Param('id') id: string) {
    return this.cakeService.deleteCake(+id);
  }
}
