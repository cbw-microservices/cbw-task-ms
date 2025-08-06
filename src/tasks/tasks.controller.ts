import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PatchTaskDto } from './dto/patch-task.dto';
import { TaskStatus } from './enums/task-status.enum';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationResponse } from './interfaces/pagination-response.interface';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller()
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    @InjectQueue('tasks-queue') private readonly tasksQueue: Queue,
  ) { }

  @MessagePattern('createTask')
  create(@Payload() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @MessagePattern('findAllTasks')
  findAll(
    @Payload() paginationDto: PaginationDto,
  ): Promise<PaginationResponse<any>> {
    return this.tasksService.findAll(paginationDto);
  }

  @MessagePattern('findOneTask')
  findOne(@Payload('id', ParseMongoIdPipe) id: string) {
    return this.tasksService.findOne(id);
  }

  @MessagePattern('updateTask')
  update(@Payload() payload: { id: string; updateTaskDto: UpdateTaskDto }) {
    const { id, updateTaskDto } = payload;
    return this.tasksService.update(id, updateTaskDto);
  }

  @MessagePattern('patchTask')
  patch(@Payload() payload: { id: string;  patchTaskDto:PatchTaskDto}) {
    const { id, patchTaskDto } = payload;
    return this.tasksService.update(id, patchTaskDto);
  }

  @MessagePattern('findByStatus')
  findByStatus(@Payload() status: TaskStatus) {
    return this.tasksService.findByStatus(status);
  }

  @MessagePattern('removeTask')
  remove(@Payload('id') id: string) {
    return this.tasksService.remove(id);
  }

  @MessagePattern('scheduleTask')
  async schedule(@Payload() payload: { id: string; runAt: Date }) {
    const delay = new Date(payload.runAt).getTime() - Date.now();
    return this.tasksQueue.add('notify', { taskId: payload.id }, { delay });
  }
}
