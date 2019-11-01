import { ActionDTO, ProjectDTO } from '../../models';
import { db } from '../db';
import { projectToBody, actionToBody } from './utils/mappers';

export const get = () =>
  db<ProjectDTO>('projects').then((projects) => projects.map((project) => projectToBody(project)));

export const getByID = async (id: string | number) =>
  await db<ProjectDTO>('projects as p')
    .where('p.id', id)
    .first()
    .then(async (project) => {
      project.actions = await getProjectActions(id);
      return project;
    });

export const getProjectActions = async (projectId: string | number) =>
  await db<ActionDTO>('actions')
    .where('project_id', projectId)
    .then((actions) => actions.map((action) => actionToBody(action)));

export const insert = async (project: ProjectDTO) =>
  await db<ProjectDTO>('projects')
    .insert(project)
    .then(([id]) => getByID(id));

export const update = async (id: string | number, changes: ProjectDTO) =>
  await db<ProjectDTO>('projects')
    .where('id', id)
    .update(changes)
    .then((count) => (count > 0 ? getByID(id) : null));

export const remove = async (id: string | number) => {
  const project = getByID(id);
  await db<ProjectDTO>('projects')
    .where('id', id)
    .del();
  return project;
};
