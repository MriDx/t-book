import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class StudentDetail extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public branch: string

  @column()
  public semester: string

  @column()
  public student_id: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @belongsTo(() => User, {
    localKey: 'student_id',
    foreignKey: 'id'
  })
  public student: BelongsTo<typeof User>

}
