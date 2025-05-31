import { Module } from '@nestjs/common';
import { BikashService } from './bikash.service';
import { BikashController } from './bikash.controller';

@Module({
  providers: [BikashService],
  controllers: [BikashController],
  exports: [BikashService],
})
export class BikashModule {}
