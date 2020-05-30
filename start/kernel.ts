import Server from '@ioc:Adonis/Core/Server';

Server.middleware.register([
  'Adonis/Core/BodyParserMiddleware',
// 'App/Middleware/SilentAuth',
]);

Server.middleware.registerNamed({
  auth: 'App/Middleware/Auth',
});
