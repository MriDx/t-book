import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash';
import Slot from './Slot';
import TeacherSlot from './TeacherSlot';
import BookRequest from './BookRequest';
import StudentDetail from './StudentDetail';

export default class User extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public role: string



  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => Slot, {
    localKey: 'user_id',
    foreignKey: 'id'
  })
  public created_slots: HasMany<typeof Slot>

  @hasMany(() => TeacherSlot, {
    localKey: 'user_id',
    foreignKey: 'id'
  })
  public slots: HasMany<typeof TeacherSlot>

  @hasMany(() => BookRequest, {
    localKey: 'id',
    foreignKey: 'student_id'
  })
  public book_requests: HasMany<typeof BookRequest>

  @hasOne(() => StudentDetail, {
    localKey: 'id',
    foreignKey: 'student_id'
  })
  public student_details: HasOne<typeof StudentDetail>


  public async toPublic() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      details: this.student_details
    }
  }



}
