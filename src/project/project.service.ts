import { Injectable, ConflictException } from '@nestjs/common';

import { ActionDTO, ActionChangeDTO } from '../models/action.dto';
import { ProjectDTO, ProjectChangeDTO } from '../models/project.dto';
import { ActionService } from '../action/action.service';
import { db } from '../data/db';
import { projectToBody, actionToBody } from '../data/mappers';

@Injectable()
export class ProjectService {
  constructor(private readonly actionService: ActionService) {}

  public async getAll() {
    const projects = await db<ProjectDTO>('projects');
    return projects.map((project) => projectToBody(project));
  }

  public async getProjectActions(id: number | string) {
    const actions = await db<ActionDTO>('actions').where('project_id', id);
    return actions.map((action) => actionToBody(action));
  }

  public async getByID(id: number | string) {
    const project = await db<ProjectDTO>('projects as p')
      .where('p.id', id)
      .first();

    if (project) {
      project.actions = await this.getProjectActions(id);
    }

    return project;
  }

  public async getActionByID(id: number | string) {
    return await this.actionService.getByID(id);
  }

  public async insert(project: ProjectChangeDTO) {
    const [id] = await db<ProjectDTO>('projects').insert(project);
    return await this.getByID(id);
  }

  public async insertAction(id: number | string, action: ActionChangeDTO) {
    return await this.actionService.insert({
      ...action,
      project_id: Number(id),
    });
  }

  public async update(id: number | string, changes: ProjectChangeDTO) {
    try {
      const count = await db<ProjectDTO>('projects')
        .where('id', id)
        .update(changes);

      return count > 0 ? await this.getByID(id) : null;
    } catch {
      throw new ConflictException('Could not update project');
    }
  }

  public async updateAction(id: number | string, action: ActionChangeDTO) {
    return await this.actionService.update(id, {
      ...action,
      project_id: Number(id),
    });
  }

  public async remove(id: number | string) {
    const project = await this.getByID(id);
    await db<ProjectDTO>('projects')
      .where('id', id)
      .del();

    return project;
  }

  public async removeAction(id: number | string) {
    return await this.actionService.remove(id);
  }
}
