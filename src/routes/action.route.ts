import express from 'express';

import { get, remove, update } from '../data/functions/action';
import { validateAction, validateActionID } from '../middleware/validation/action.validation';

export const actionRoute = express.Router();

actionRoute.get('/', async (req, res) => res.json(await get()));

actionRoute.use('/:id', validateAction());
actionRoute.use('/:id', validateActionID());
actionRoute.get('/:id', async (req, res) => res.json(req.action));

actionRoute.put('/:id', async (req, res) => {
  try {
    const action = await update(req.params.id, req.newAction);
    res.json(action);
  } catch (error) {
    res.status(500).json(error.toString());
  }
});

actionRoute.delete('/:id', async (req, res) => {
  try {
    const action = await remove(req.params.id);
    res.json(action);
  } catch (error) {
    res.status(500).json(error.toString());
  }
});
