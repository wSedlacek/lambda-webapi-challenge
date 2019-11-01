import { Middleware, ActionDTO } from '../../models';
import { getByID } from '../../data/functions/action';

declare global {
  namespace Express {
    interface Request {
      action: ActionDTO;
      newAction: ActionDTO;
    }
  }
}

export const validateAction: Middleware = () => (req, res, next) => {
  if (req.method !== 'POST' && req.method !== 'PUT') return next();
  req.newAction = req.body;

  if (Object.keys(req.body).length === 0) res.status(400).json({ message: 'Missing project data' });
  if (!req.body.description || !req.body.notes || req.body.completed === null)
    res.status(400).json({ message: 'Missing required field' });
  else return next();
};

export const validateActionID: Middleware = () => async (req, res, next) => {
  req.action = await getByID(req.params.id);
  if (!req.action) res.status(404).json({ message: 'Invalid Action ID' });
  else return next();
};
