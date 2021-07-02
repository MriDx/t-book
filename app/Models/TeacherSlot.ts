import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Slot from './Slot'
import User from './User'

export default class TeacherSlot extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public slot_id: number

  @column({serializeAs: 'teacher_id'})
  public user_id: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /* @hasOne(() => Slot)
  public slot: HasOne<typeof Slot> */

  @hasOne(() => User, {
    localKey: 'user_id',
    foreignKey: 'id'
  })
  public teacher: HasOne<typeof User>


  @belongsTo(() => Slot, {
    localKey: 'id',
    foreignKey: 'slot_id'
  })
  public slot: BelongsTo<typeof Slot>

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'user_id'
  })
  public user: BelongsTo<typeof User>



}
