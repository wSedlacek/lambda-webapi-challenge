import { Injectable, ConflictException } from '@nestjs/common';

import { ActionDTO, ActionChangeDTO } from '../models/action.dto';
import { db } from '../data/db';
import { actionToBody } from '../data/mappers';

@Injectable()
export class ActionService {
  public async getAll() {
    const actions = await db<ActionDTO>('actions');
    return actions.map((action) => actionToBody(action));
  }

  public async getByID(id: number | string) {
    const action = await db<ActionDTO>('actions')
      .where('id', id)
      .first();
    return actionToBody(action);
  }

  public async insert(action: ActionChangeDTO) {
    const [id] = await db<ActionDTO>('actions').insert(action);
    return this.getByID(id);
  }

  public async update(id: number | string, changes: ActionChangeDTO) {
    try {
      const count = await db<ActionDTO>('actions')
        .where('id', id)
        .update(changes);
      return count > 0 ? this.getByID(id) : null;
    } catch {
      throw new ConflictException('Could not update action');
    }
  }

  public async remove(id: number | string) {
    const action = this.getByID(id);
    await db<ActionDTO>('actions')
      .where('id', id)
      .del();
    return action;
  }
}
