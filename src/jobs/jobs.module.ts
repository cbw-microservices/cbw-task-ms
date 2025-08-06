import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { NotifyProcessor } from './processors/notify.processor';
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'tasks-queue',
    }),
  ],
  providers: [NotifyProcessor],
})
export class JobsModule {}
