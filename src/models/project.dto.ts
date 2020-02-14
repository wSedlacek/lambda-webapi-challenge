// tslint:disable: max-classes-per-file

import { ActionDTO } from './action.dto';
import { IsValidId } from '../validation/id.validation';

export class ProjectDTO {
  @IsValidId('project', { message: 'Invalid Project' })
  public id?: string | number;
  public name: string;
  public description: string;
  public completed: boolean | 0 | 1;
  public actions?: ActionDTO[];
}

export class ProjectChangeDTO {
  public name: string;
  public description: string;
  public completed: boolean;
}
