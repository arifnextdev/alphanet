import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CupponService } from './cuppon.service';
import { ZodValidationPipe } from 'src/product/common/zodValidationPipe';
import { createCupponDto, CreateCupponSchema } from './dto/create.cuppon.dto';

@Controller('cuppons')
export class CupponController {
  constructor(private readonly cupponService: CupponService) {}

  @Get()
  getCuppons(@Query() query: any) {
    return this.cupponService.getCuppons(query);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(CreateCupponSchema))
  createCuppon(@Body() data: createCupponDto) {
    return this.cupponService.createCuppon(data);
  }

  @Put(':id')
  @UsePipes(new ZodValidationPipe(CreateCupponSchema))
  updateCuppon(@Param('id') id: string, @Body() data: createCupponDto) {
    return this.cupponService.updateCuppon(id, data);
  }

  @Delete(':id')
  deleteCuppon(@Param('id') id: string) {
    return this.cupponService.deleteCuppon(id);
  }
}
