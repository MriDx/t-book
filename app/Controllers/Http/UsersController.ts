import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
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

  public async show({ auth }: HttpContextContract) {
    return await auth.use('api').authenticate()
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

}
