export class ActionDTO {
  id?: number;
  project_id?: number;
  description: string;
  notes: string;
  completed: boolean | 0 | 1;
}
