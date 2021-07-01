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

Route.group(() => {
  Route.post('register', 'UsersController.create')
  Route.post('login', 'UsersController.login')
  Route.get('me', 'UsersController.show').middleware(['auth'])



  Route.post('slot/create', 'SlotsController.create').middleware(['admin'])
  Route.post('slot/timing/create', 'SlotTimingsController.create').middleware(['admin'])

  Route.post('slot/add', 'TeacherSlotsController.create').middleware(['admin'])

  Route.get('slot/available', 'TeacherSlotsController.index')

}).prefix('api/v1')





