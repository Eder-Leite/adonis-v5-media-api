import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Medias extends BaseSchema {

  protected tableName = 'medias';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE');
      table.enu('type', ['IMAGE', 'VIDEO', 'FORESCAT']).notNullable().defaultTo('FORESCAT');
      table.string('title', 500).notNullable();
      table.integer('city').nullable();
      table.string('directory', 500).notNullable();
      table.integer('duration').notNullable().defaultTo(60);
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
