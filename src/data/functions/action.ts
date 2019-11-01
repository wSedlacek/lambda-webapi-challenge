import { ActionDTO } from '../../models';
import { db } from '../db';
import { actionToBody } from './utils/mappers';

export const get = async () =>
  await db<ActionDTO>('actions').then((actions) => actions.map((action) => actionToBody(action)));

export const getByID = async (id: string | number) =>
  await db<ActionDTO>('actions')
    .where('id', id)
    .first()
    .then((action) => actionToBody(action));

export const insert = async (action: ActionDTO) =>
  await db<ActionDTO>('actions')
    .insert(action)
    .then(([id]) => getByID(id));

export const update = async (id: string | number, changes: ActionDTO) =>
  await db<ActionDTO>('actions')
    .where('id', id)
    .update(changes)
    .then((count) => (count > 0 ? getByID(id) : null));

export const remove = async (id: string | number) => {
  const action = getByID(id);
  await db<ActionDTO>('actions')
    .where('id', id)
    .del();
  return action;
};
