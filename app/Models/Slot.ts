import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import TeacherSlot from './TeacherSlot';
import SlotTiming from './SlotTiming';

export default class Slot extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string


  @column()
  public timing_id: number

  @column()
  public user_id: number

  @column()
  public capacity: number



  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => SlotTiming, {
    localKey: 'timing_id',
    foreignKey: 'id'
  })
  public timing: HasOne<typeof SlotTiming>


}
