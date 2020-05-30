import Pleace from './Pleace';
import { DateTime } from 'luxon';
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';

export default class Group extends BaseModel {

  public static table = 'groups';

  @hasMany(() => Pleace, {
    foreignKey: 'group_id',
  })
  public pleaces: HasMany<typeof Pleace>;

  @column({ isPrimary: true })
  public id: number;

  @column()
  public user_id: number;

  @column()
  public description: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
