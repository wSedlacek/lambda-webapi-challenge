import Knex from 'knex';
import { clean } from 'knex-cleaner';

export const seed = (knex: Knex) => clean(knex);
