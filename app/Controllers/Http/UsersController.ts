import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import StudentRegisterValidator from 'App/Validators/StudentRegisterValidator'
import UserCreateValidator from 'App/Validators/UserCreateValidator'
import UserLoginValidator from 'App/Validators/UserLoginValidator'

export default class UsersController {
  public async index ({}: HttpContextContract) {
  }

  public async create({ request, response}: HttpContextContract) {
    const data = await request.validate(UserCreateValidator)
    await User.create(data)
    return response.status(200).json({status: 'success'})
  }

  public async store ({}: HttpContextContract) {
  }

  public async show({ auth, response }: HttpContextContract) {
    const user =  await auth.use('api').authenticate()
    let details = await user.related('student_details').query().first()

    return response.status(200).json({
      data: {
        user: user,
        details: details
      }
    })
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }

  public async login({ request, auth }: HttpContextContract) {
    const data = await request.validate(UserLoginValidator)
    const token = await auth.use('api').attempt(data.email, data.password)
    return token.toJSON()
  }

  public async studentRegister({ request, auth, response }: HttpContextContract) {
    const data = await request.validate(StudentRegisterValidator)
    const trx = await Database.transaction()

    try {
      const user = await User.create({name: data.name, email: data.email, password: data.password}, trx)
      await user.related('student_details').create({ branch: data.branch, semester: data.semester })
      await trx.commit()

      const token = await auth.use('api').attempt(data.email, data.password)
      return response.status(200).json({
        status: 'success',
        data: token.toJSON()
      })

    } catch (error) {
      await trx.rollback()

    }

    return response.status(422).json({ status: 'failed' })

  }


  public async teacherRegister({ request, auth, response }: HttpContextContract) {
    const data = await request.validate(UserCreateValidator)
    const user = await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'teacher'
    })
    await user.save()
    const token = await auth.use('api').attempt(data.email, data.password)
    return response.status(200).json({
      status: 'success',
      data: token.toJSON()
    })
  }

}
