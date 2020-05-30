import Media from './Media';
import { DateTime } from 'luxon';
import { BaseModel, HasMany, hasMany, column } from '@ioc:Adonis/Lucid/Orm';

export default class Publication extends BaseModel {

  public static table = 'publications';

  @hasMany(() => Media, {
    foreignKey: 'media_id',
  })
  public pleaces: HasMany<typeof Media>;

  @column({ isPrimary: true })
  public id: number;

  @column()
  public ordination: number;

  @column()
  public group_id: number;

  @column()
  public user_id: number;

  @column()
  public media_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
