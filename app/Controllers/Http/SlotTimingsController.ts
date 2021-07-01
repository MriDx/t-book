import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SlotTiming from 'App/Models/SlotTiming'

export default class SlotTimingsController {
  public async index ({}: HttpContextContract) {
  }

  public async create({ request, response }: HttpContextContract) {
    let { timing } = request.all()
    await SlotTiming.create({timing: timing})
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
