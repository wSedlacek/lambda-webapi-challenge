import Knex from 'knex';

export const up = (knex: Knex, _: Promise<any>) =>
  knex.schema.createTable('projects', function(projects) {
    projects.increments();

    projects.string('name', 128).notNullable();
    projects.text('description').notNullable();
    projects.boolean('completed').defaultTo(false);
  });

export const down = (knex: Knex, _: Promise<any>) => knex.schema.dropTableIfExists('projects');
