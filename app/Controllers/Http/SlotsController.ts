import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Slot from 'App/Models/Slot'
import SlotCreateValidator from 'App/Validators/SlotCreateValidator'

export default class SlotsController {
  public async index({ }: HttpContextContract) {
    return await Slot.query()
      .preload('timing')

  }

  public async create({ request, auth, response }: HttpContextContract) {
    const data = await request.validate(SlotCreateValidator)
    const user = await auth.use('api').authenticate()
    const slot = new Slot()
    slot.name = data.name
    slot.timing_id = data.timing_id
    slot.user_id = user.id
    await slot.save()
    return response.status(200).json({status: 'succes'})
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
