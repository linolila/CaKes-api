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
import { CakesFilterDto } from './dto/cake.filter.dto';

@ApiTags('cakes')
@Controller('cakes')
export class CakesController {
  constructor(private cakeService: CakesService) {}
  @Get()
  getCakes(@Query() filter: CakesFilterDto): {
    total: number;
    page: number;
    limit: number;
    data: Cakes[];
  } {
    // forward the entire filter object to the service
    return this.cakeService.getAllCakes(filter);
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
