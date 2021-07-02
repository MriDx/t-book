import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BookRequest from 'App/Models/BookRequest'
import TeacherSlot from 'App/Models/TeacherSlot'
import BookRequestActionValidator from 'App/Validators/BookRequestActionValidator'
import BookRequestValidator from 'App/Validators/BookRequestValidator'
import { AuthenticationException } from '@adonisjs/auth/build/standalone';
import { Exception } from '@adonisjs/core/build/standalone'
import axios from 'axios'

export default class BookRequestsController {
  public async index({ }: HttpContextContract) {
    return await BookRequest.query()
      .preload('slot_data', (b) => b.preload('slot', (b) => b.preload('timing')))
      .preload('requested_by', (b) => b.select(['id', 'name', 'email']))

  }

  public async create({ request, auth, response }: HttpContextContract) {
    const data = await request.validate(BookRequestValidator)
    const student = await auth.use('api').authenticate()
    try {
      await student.related('book_requests').query().where('teacher_slot_id', data.teacher_slot_id).firstOrFail()
      return response.status(200).json({ status: 'success', message: 'already requested' })
    } catch (error) {
    }

    const bookRequest = new BookRequest()
    bookRequest.teacher_slot_id = data.teacher_slot_id
    bookRequest.student_id = student.id
    await bookRequest.save()
    return response.status(200).json({ status: 'success' })
  }

  public async store({ }: HttpContextContract) {
  }

  public async show({ }: HttpContextContract) {
  }

  public async edit({ }: HttpContextContract) {
  }

  public async update({ }: HttpContextContract) {
  }

  public async destroy({ }: HttpContextContract) {
  }

  public async action({ request, auth, response }: HttpContextContract) {
    const data = await request.validate(BookRequestActionValidator)
    const user = await auth.use('api').authenticate()
    const bookRequest = await BookRequest.findByOrFail('id', data.request_id)

    if (user.role == 'teacher') {
      try {
        const teacherSlot = await TeacherSlot.findByOrFail('user_id', bookRequest.teacher_slot_id)
        if (teacherSlot.user_id != user.id) {
          throw new Exception('')
        }
      } catch (error) {
        throw new AuthenticationException(
          'You have no permission to fulfil the request',
          'Unauthorized access',
          'null',
          'null'
        )
      }

    }



    bookRequest.action_by = user.id
    bookRequest.status = data.status
    await bookRequest.save()
    return response.status(200).json({ status: 'success' })

  }


  public async pending({ }: HttpContextContract) {
    return await BookRequest.query()
      .where('status', 'requested')
      .preload('slot_data', (b) => b.preload('slot', (b) => b.preload('timing')))
      .preload('requested_by', (b) => b.select(['id', 'name', 'email']))
  }

  public async accepted({ }: HttpContextContract) {
    return await BookRequest.query()
      .where('status', 'accepted')
      .preload('slot_data', (b) => b.preload('slot', (b) => b.preload('timing')))
      .preload('requested_by', (b) => b.select(['id', 'name', 'email']))
  }

  public async rejected({ }: HttpContextContract) {
    return await BookRequest.query()
      .where('status', 'rejected')
      .preload('slot_data', (b) => b.preload('slot', (b) => b.preload('timing')))
      .preload('requested_by', (b) => b.select(['id', 'name', 'email']))
  }

  public async test({ response }: HttpContextContract) {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    if (res.status != 200) {
      return response.json({ staus: 'failed' })
    }
    return response.json({ staus: res.data })
  }

  public async myrequests({ auth }: HttpContextContract) {
    const user = await auth.use('api').authenticate()
    return await user.related('book_requests').query()
      .preload('slot_data', (b) => b.preload('slot').preload('teacher', (b) => b.select(['id', 'name'])))
      .preload('action_perfromed_by', (b) => b.select(['id', 'name']))

  }




}
