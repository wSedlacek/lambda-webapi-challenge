import { ActionDTO } from './action.dto';

export class ProjectDTO {
  id?: string | number;
  name: string;
  description: string;
  completed: boolean | 0 | 1;
  actions?: ActionDTO[];
}
