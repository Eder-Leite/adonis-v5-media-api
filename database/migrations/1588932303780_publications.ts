import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Publications extends BaseSchema {
  protected tableName = 'publications';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('ordination').notNullable();
      table
        .integer('group_id')
        .references('id')
        .inTable('Groups')
        .onUpdate('CASCADE')
      table
        .integer('user_id')
        .references('id')
        .inTable('Users')
        .onUpdate('CASCADE')
      table
        .integer('media_id')
        .notNullable()
        .references('id')
        .inTable('Medias')
        .onUpdate('CASCADE')
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
