import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './entities/task.entity';
import { BullModule } from '@nestjs/bull';
import { NotifyProcessor } from 'src/jobs/processors/notify.processor';

@Module({
  controllers: [TasksController],
  providers: [TasksService, NotifyProcessor],
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    BullModule.registerQueue({
      name: 'tasks-queue',
    }),
  ],
})
export class TasksModule {}
