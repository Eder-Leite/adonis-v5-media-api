import Route from '@ioc:Adonis/Core/Route';

Route.on('/').render('welcome');

Route.on('register').render('register');
Route.post('/register', 'AuthController.register');

Route.get('/dashboard', async ({ auth }) => {
    const user = await auth.authenticate()
    return `Hello user! Your email address is ${user.email}`
}).middleware(['auth']);

Route.on('login').render('login');
Route.post('/login', 'AuthController.login');
Route.post('/reset-password', 'AuthController.resetPassword');
Route.get('/logout', 'AuthController.logout').middleware(['auth']);
Route.get('/user-profile', 'AuthController.userProfile').middleware(['auth']);
Route.post('/alter-password', 'AuthController.alterPassowrd').middleware(['auth']);

Route.group(() => {
    Route.resource('users', 'UsersController')
        .apiOnly()
        .except([]);
}).middleware(['auth']);

Route.get('/publicationUsers', 'UsersController.showPublication').middleware(['auth']);

Route.group(() => {
    Route.resource('medias', 'MediasController')
        .apiOnly()
        .except([]);
}).middleware(['auth']);

Route.delete('/medias/:id/deleteFile', 'MediasController.destroyFile').middleware(['auth']);

Route.group(() => {
    Route.resource('groups', 'GroupsController')
        .apiOnly()
        .except([]);
}).middleware(['auth']);

Route.group(() => {
    Route.resource('pleaces', 'PleacesController')
        .apiOnly()
        .except([]);
}).middleware(['auth']);

Route.group(() => {
    Route.resource('publications', 'PublicationsController')
        .apiOnly()
        .except([]);
}).middleware(['auth']);

Route.post('/publications/process', 'PublicationsController.process').middleware(['auth']);