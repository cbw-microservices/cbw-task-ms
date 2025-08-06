import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ default: 'pending', enum: ['pending', 'in_progress', 'completed'] })
  status: string;

  @Prop()
  assigned_to?: string;

  @Prop()
  due_date?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
