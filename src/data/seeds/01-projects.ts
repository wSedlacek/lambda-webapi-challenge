import Knex from 'knex';

export const seed = (knex: Knex, _: Promise<any>) =>
  knex('projects').insert([
    {
      name: 'Complete Node.js and Express Challenge',
      description:
        'Build and Awesome API Using Node.js and Express to Manage Projects and Actions GTD Style!',
    },
  ]);
