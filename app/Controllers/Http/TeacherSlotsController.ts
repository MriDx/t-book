import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TeacherSlot from 'App/Models/TeacherSlot'
import TeacherSlotValidator from 'App/Validators/TeacherSlotValidator'

export default class TeacherSlotsController {
  public async index({ }: HttpContextContract) {
    return await TeacherSlot.query()
      .preload('slot', (b) => b.preload('timing'))
      .preload('teacher', (b) => b.select(['id', 'name']))


  }

  public async create({ request, response }: HttpContextContract) {
    const data = await request.validate(TeacherSlotValidator)
    await TeacherSlot.create({slot_id: data.slot_id, user_id: data.teacher_id})
    return response.status(200).json({status: 'success'})
  }

  public async store ({}: HttpContextContract) {
  }

  public async show ({}: HttpContextContract) {
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }

}
