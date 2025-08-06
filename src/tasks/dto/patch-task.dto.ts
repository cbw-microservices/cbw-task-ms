import { IsEnum, IsMongoId } from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';

export class PatchTaskDto {
  
  @IsEnum(TaskStatus, {
    message: `status must be one of the following values: ${Object.values(
      TaskStatus,
    ).join(', ')}`,
  })
  status: TaskStatus;

}
