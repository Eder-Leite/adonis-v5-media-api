import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Pleaces extends BaseSchema {
  protected tableName = 'pleaces';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table
        .integer('group_id')
        .notNullable()
        .references('id')
        .inTable('Groups')
        .onUpdate('CASCADE');
      table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable('Users')
        .onUpdate('CASCADE');
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
