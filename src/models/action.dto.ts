// tslint:disable: max-classes-per-file

import { IsValidId } from '../validation/id.validation';

export class ActionDTO {
  @IsValidId('action', { message: 'Invalid Project' })
  public id?: number;
  public project_id?: number;
  public description: string;
  public notes: string;
  public completed: boolean | 0 | 1;
}

export class ActionChangeDTO {
  public project_id?: number;
  public description: string;
  public notes: string;
  public completed: boolean;
}
