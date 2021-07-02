import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminTeacher {
  public async handle ({auth}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    if (!await auth.check()) throw new AuthenticationException(
      'Permission Denied',
      'Unauthorized access',
      'api',
      'null',
    )
    let user = await auth.use('api').authenticate()
    if (!user.role || user.role != 'admin' && user.role != 'teacher') {
      //throw new Exception('Invalid access exception', 401)
      throw new AuthenticationException(
        'Permission Denied',
        'Unauthorized access',
        'api',
        'null',
      )
    }
    await next()
  }
}
