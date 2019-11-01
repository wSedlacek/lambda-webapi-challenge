import knex from 'knex';
import { development } from './knexConfig';

export const db = knex(development);
