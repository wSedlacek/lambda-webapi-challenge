import { Module } from '@nestjs/common';

import { ActionService } from '../action/action.service';

import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [],
  controllers: [ProjectController],
  providers: [ProjectService, ActionService],
})
export class ProjectModule {}
