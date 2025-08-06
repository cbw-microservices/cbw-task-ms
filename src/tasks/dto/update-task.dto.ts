import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsMongoId, IsString } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
}
