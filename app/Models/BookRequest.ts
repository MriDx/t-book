import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import TeacherSlot from './TeacherSlot'
import User from './User'

export default class BookRequest extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public teacher_slot_id: number

  @column()
  public student_id: number

  @column()
  public status: string

  @column()
  public action_by: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => TeacherSlot, {
    localKey: 'id',
    foreignKey: 'teacher_slot_id'
  })
  public slot_data: BelongsTo<typeof TeacherSlot>

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'student_id'
  })
  public requested_by: BelongsTo<typeof User>

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'action_by'
  })
  public action_perfromed_by: BelongsTo<typeof User>

}
