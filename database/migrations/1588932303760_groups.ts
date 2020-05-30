import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Groups extends BaseSchema {
  protected tableName = 'groups';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable('Users')
        .onUpdate('CASCADE');
      table.string('description', 500).notNullable();
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
