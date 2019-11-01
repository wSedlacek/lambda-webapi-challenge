import express from 'express';

import { validateAction, validateProject, validateProjectID } from '../middleware/validation';
import { get, insert, update, remove } from '../data/functions/project';
import { insert as insertAction } from '../data/functions/action';

export const projectRoute = express.Router();

projectRoute.get('/', async (req, res) => res.json(await get()));
projectRoute.use('/', validateProject());
projectRoute.post('/', async (req, res) => {
  try {
    const project = await insert(req.newProject);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json(error.toString());
  }
});

projectRoute.use('/:id', validateProjectID());
projectRoute.get('/:id', async (req, res) => res.json(req.project));
projectRoute.put('/:id', async (req, res) => {
  try {
    const project = await update(req.params.id, req.newProject);
    res.json(project);
  } catch (error) {
    res.status(500).json(error.toString());
  }
});
projectRoute.delete('/:id', async (req, res) => {
  try {
    const project = await remove(req.params.id);
    res.json(project);
  } catch (error) {
    res.status(500).json(error.toString());
  }
});

projectRoute.use('/:id/actions', validateAction());
projectRoute.get('/:id/actions', async (req, res) => res.json(req.project.actions));
projectRoute.post('/:id/actions', async (req, res) => {
  try {
    const action = await insertAction({ ...req.body, project_id: req.params.id });
    res.json(action);
  } catch (error) {
    res.status(500).json(error.toString());
  }
});
