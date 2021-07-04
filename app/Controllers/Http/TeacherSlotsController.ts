import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TeacherSlot from 'App/Models/TeacherSlot'
import TeacherSlotValidator from 'App/Validators/TeacherSlotValidator'
import { Exception } from '@adonisjs/core/build/standalone';
import { AuthenticationException } from '@adonisjs/auth/build/standalone';

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

  public async myslots({ auth }: HttpContextContract) {
    const user = await auth.use('api').authenticate()
    return await TeacherSlot.query()
      .where('user_id', user.id)
      .withCount('requests', (b) => b.as('total_requests'))
      .preload('requests')
  }

  public async myslot({ auth, params: { id } }) {
    const user = await auth.use('api').authenticate()
    try {
      const data = await TeacherSlot.findByOrFail('id', id)

      if (data.user_id != user.id) throw new Exception('')
      return await data.related('requests').query().preload('requested_by', (b) => b.select(['id', 'name']).preload('student_details'))
    } catch (error) {

    }
    throw new AuthenticationException(
      'You have no permission to fulfil the request',
      'Unauthorized access',
      'null',
      'null'
    )

  }



}
