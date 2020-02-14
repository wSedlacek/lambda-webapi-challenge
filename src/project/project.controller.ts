import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  BadGatewayException,
} from '@nestjs/common';

import { ProjectChangeDTO } from '../models/project.dto';
import { ActionChangeDTO } from '../models/action.dto';
import { NotFoundInterceptor } from '../interceptors/not-found.interceptor';

import { ProjectService } from './project.service';

@Controller('project')
@UseInterceptors(NotFoundInterceptor)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  public async getAll() {
    return await this.projectService.getAll();
  }

  @Post()
  public async insert(@Body() createProjectDTO: ProjectChangeDTO) {
    return await this.projectService.insert(createProjectDTO);
  }

  @Get('/:id')
  public async getByID(@Param('id') id: string) {
    return await this.projectService.getByID(id);
  }

  @Put('/:id')
  public async update(
    @Param('id') id: string,
    @Body() updateProjectDTO: ProjectChangeDTO,
  ) {
    return await this.projectService.update(id, updateProjectDTO);
  }

  @Delete('/:id')
  public async remove(@Param('id') id: string) {
    return await this.projectService.remove(id);
  }

  @Get('/:id/actions')
  public async getProjectActions(@Param('id') id: number) {
    return await this.projectService.getProjectActions(id);
  }

  @Post('/:id/actions')
  public async insertAction(
    @Param('id') id: string,
    @Body() createActionDTO: ActionChangeDTO,
  ) {
    return await this.projectService.insertAction(id, createActionDTO);
  }

  @Get('/:project/actions/:id')
  public async getActionByID(
    @Param('project') projectID: string,
    @Param('id') id: string,
  ) {
    const project = await this.projectService.getByID(projectID);
    if (project.actions.every((action) => action.id !== Number(id))) {
      throw new BadGatewayException('Action ID Not Found!');
    }

    return await this.projectService.getActionByID(Number(id));
  }

  @Put('/:project/actions/:id')
  public async updateAction(
    @Param('project') projectID: string,
    @Param('id') id: string,
    @Body() updateActionDTO: ActionChangeDTO,
  ) {
    const project = await this.projectService.getByID(projectID);
    if (project.actions.every((action) => action.id !== Number(id))) {
      throw new BadGatewayException('Action ID Not Found!');
    }

    return await this.projectService.updateAction(id, updateActionDTO);
  }

  @Delete('/:project/actions/:id')
  public async deleteAction(
    @Param('project') projectID: string,
    @Param('id') id: string,
  ) {
    const project = await this.projectService.getByID(projectID);
    if (project.actions.every((action) => action.id !== Number(id))) {
      throw new BadGatewayException('Action ID Not Found!');
    }

    return await this.projectService.removeAction(id);
  }
}
