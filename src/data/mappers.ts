import { ActionDTO } from '../models/action.dto';
import { ProjectDTO } from '../models/project.dto';

export const intToBoolean = (int: number | boolean) =>
  int === 1 ? true : false;

export const booleanToInt = (bool: boolean) => (bool === true ? 1 : 0);

export const projectToBody = (project: ProjectDTO) => {
  const result = {
    ...project,
    completed: intToBoolean(project.completed),
  };

  if (project.actions) {
    result.actions = project.actions.map((action: ActionDTO) => ({
      ...action,
      completed: intToBoolean(action.completed),
    }));
  }

  return result as ProjectDTO;
};

export const actionToBody = (action: ActionDTO) =>
  action
    ? ({
        ...action,
        completed: intToBoolean(action.completed),
      } as ActionDTO)
    : action;
