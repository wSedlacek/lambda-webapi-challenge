import express from 'express';
import helmet from 'helmet';

import { actionRoute, projectRoute } from './routes';

export const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/action', actionRoute);
server.use('/api/project', projectRoute);
