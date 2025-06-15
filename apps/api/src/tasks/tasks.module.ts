import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { TasksService } from './tasks.service';
import { TasksWorker } from './tasks.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'provision',
    }),
  ],
  providers: [TasksWorker, TasksService],
  exports: [TasksService],
})
export class TasksModule {}
