import { Process, Processor } from '@nestjs/bull';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bullmq';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/tasks/entities/task.entity';

@Processor('tasks-queue')
export class NotifyProcessor {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  @Process('notify')
  async handleNotify(job: Job) {
    console.log('Processing job:', job.data);
    // send notification logic here
    // For example, you could send an email or a message to a user
    const { taskId } = job.data;

    // find the task by ID
    const task = await this.taskModel.findById(taskId).exec();

    if (!task) {
      console.log(`Task ${taskId} not found`);
      return;
    }

    // simulate sending a notification
    console.log(
      `🔔 Recordatorio: la tarea "${task.title}" está cerca de su due_date (${task.due_date})`,
    );
  }
}
