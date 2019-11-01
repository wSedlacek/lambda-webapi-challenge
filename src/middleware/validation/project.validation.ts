import { Middleware, ProjectDTO } from '../../models';
import { getByID } from '../../data/functions/project';

declare global {
  namespace Express {
    interface Request {
      project: ProjectDTO;
      newProject: ProjectDTO;
    }
  }
}

export const validateProject: Middleware = () => (req, res, next) => {
  if (req.path !== '/') return next();
  if (req.method !== 'POST' && req.method !== 'PUT') return next();
  req.newProject = req.body;

  if (Object.keys(req.body).length === 0) res.status(400).json({ message: 'Missing project data' });
  else if (!req.body.name || !req.body.description || req.body.completed === null)
    res.status(400).json({ message: 'Missing required field' });
  else return next();
};

export const validateProjectID: Middleware = () => async (req, res, next) => {
  req.project = await getByID(req.params.id);
  if (!req.project) res.status(404).json({ message: 'Invalid Project ID' });
  else return next();
};
