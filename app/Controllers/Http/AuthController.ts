import User from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash';
import Database from '@ioc:Adonis/Lucid/Database';
import { resetPassword } from 'App/Services/ResetPassowd';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthController {
    public async register({ request, auth, response }: HttpContextContract) {

        const validationSchema = schema.create({
            email: schema.string({ trim: true }, [
                rules.email(),
                rules.unique({ table: 'users', column: 'email' }),
            ]),
            password: schema.string({ trim: true }, [
                rules.confirmed(),
            ]),
            name: schema.string({ trim: false }, [rules.required()])
        });

        const userDetails = await request.validate({
            schema: validationSchema,
        });

        const user = new User();
        user.type = 'USER';
        user.status = 'ACTIVE';
        user.email = userDetails.email;
        user.name = userDetails.name;
        user.password = userDetails.password;
        await user.save();

        await auth.login(user);
        return response.redirect('/dashboard');
    }

    public async login({ auth, request, response }: HttpContextContract) {
        const email = request.input('email');
        const password = request.input('password');
        const rememberUser = !!request.input('remember_me');

        await auth.attempt(email, password, rememberUser);

        response.redirect('/dashboard');
    }

    public async resetPassword({ request, response }: HttpContextContract) {
        const email = request.input('email');
        const username = request.input('username');
        const
            user = await Database.rawQuery('select * from users where lower(email) = ? and upper(name) = ?', [email, username]);

        const body = {
            status: 404,
            message: 'Incorrect user or email!'
        };

        if (user) {
            if (await resetPassword(user[0])) {
                response.status(200);
            } else {
                response.status(404).send(body, true);
            }
        } else {
            response.status(404).send(body, true);
        }
    }

    public async logout({ auth, response }: HttpContextContract) {
        await auth.logout();

        response.redirect('/');
    }

    public async alterPassowrd({ auth, request, response }: HttpContextContract) {
        const { password, newPassword } = request.only(['password', 'newPassword']);
        const user = await User.findOrFail(auth.user?.id);

        console.log(password, newPassword, user);

        if (await Hash.verify(user.password, password)) {

            user.merge({ password: newPassword });
            await user.save();
            response.status(200);
        } else {
            const body = {
                status: 404,
                message: 'The password entered does not match the current password!'
            }
            response.status(404).send(body, true);
        }
    }

    public async userProfile({ auth }: HttpContextContract) {
        const data = await User.findOrFail(auth.user?.id);
        return data;
    }
}