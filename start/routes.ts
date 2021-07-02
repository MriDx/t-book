/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/test', 'BookRequestsController.test')

Route.group(() => {
  //Route.post('register', 'UsersController.create')
  Route.post('login', 'UsersController.login')
  Route.get('me', 'UsersController.show').middleware(['auth'])

  Route.post('student/register', 'UsersController.studentRegister')
  Route.post('teacher/register', 'UsersController.teacherRegister')



  Route.post('slot/create', 'SlotsController.create').middleware(['admin'])
  Route.post('slot/timing/create', 'SlotTimingsController.create').middleware(['admin'])

  Route.post('slot/add', 'TeacherSlotsController.create').middleware(['admin'])

  Route.get('slot/available', 'TeacherSlotsController.index')

  Route.post('slot/request', 'BookRequestsController.create').middleware(['student'])

  Route.get('slot/requests', 'BookRequestsController.index').middleware(['admin'])
  Route.get('slot/requests/pending', 'BookRequestsController.pending').middleware(['admin'])
  Route.get('slot/requests/accepted', 'BookRequestsController.accepted').middleware(['admin'])
  Route.get('slot/requests/rejected', 'BookRequestsController.rejected').middleware(['admin'])

  Route.get('my_slots', 'TeacherSlotsController.myslots').middleware(['teacher'])


  Route.put('slot/action', 'BookRequestsController.action').middleware(['adminteacher'])

  Route.get('my_requests', 'BookRequestsController.myrequests').middleware(['student'])

}).prefix('api/v1')





