import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TeacherMiddleware {
	/**
	 * Handle request
	 */
	public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
		if (!await auth.check()) throw new AuthenticationException(
			'Permission Denied',
			'Unauthorized access',
			'api',
			'null',
		)
		let user = await auth.use('api').authenticate()
		if (!user.role || user.role != 'teacher') {
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