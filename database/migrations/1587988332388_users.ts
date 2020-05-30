import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string('email', 255).notNullable().unique();
      table.string('name', 255).notNullable();
      table.string('password', 255).notNullable();
      table.enu('type', ['ADMIN', 'USER']).notNullable().defaultTo('USER');
      table.enu('status', ['ACTIVE', 'INACTIVE']).notNullable().defaultTo('ACTIVE');
      table.string('remember_me_token').nullable();
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
