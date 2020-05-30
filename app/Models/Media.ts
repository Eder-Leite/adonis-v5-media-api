import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Media extends BaseModel {

  public static table = 'medias';

  @column({ isPrimary: true })
  public id: number;

  @column()
  public user_id: number;

  @column()
  public type: string;

  @column()
  public city: number;

  @column()
  public title: string;

  @column()
  public directory: string;

  @column()
  public duration: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
