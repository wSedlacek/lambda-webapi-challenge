import { Module } from '@nestjs/common';
import { ProjectModule } from './project/project.module';
import { ActionModule } from './action/action.module';

@Module({
  imports: [ActionModule, ProjectModule],
})
export class AppModule {}
