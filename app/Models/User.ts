import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import {
  column,
  beforeSave,
  BaseModel,
} from '@ioc:Adonis/Lucid/Orm';

export default class User extends BaseModel {

  public static table = 'users';

  @column({ isPrimary: true })
  public id: number;

  @column()
  public email: string;

  @column()
  public name: string;

  @column()
  public password: string;

  @column()
  public type: string;

  @column()
  public status: string;

  @column()
  public rememberMeToken?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.hash(user.password);
    }
  }
}
