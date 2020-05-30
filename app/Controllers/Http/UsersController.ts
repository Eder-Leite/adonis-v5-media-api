import User from 'App/Models/User';
import Database from '@ioc:Adonis/Lucid/Database';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export interface Publications {
    id: number;
    mediaId: number;
    ordination: number;
    userId?: number;
    groupId?: number;
    type: string;
    title: string;
    city: number;
    directory: string;
    duration: number;
}

export default class UsersController {

    public async index({ request }: HttpContextContract) {
        var name = request.input('name');

        if (name) {
            name = '%' + name + '%';
        } else {
            name = '%%';
        }

        var status = request.input('status');

        if (status) {
            status = '%' + status + '%';
        } else {
            status = '%%';
        }

        const data = await Database.rawQuery('select * from users where upper(name) like ? and status like ? order by name', [name, status]);
        return data;
    }

    public async store({ request, response }: HttpContextContract) {
        const data = request.only(['name', 'email', 'password']);
        const user = await User.create(data);
        return response.status(201).send(user);
    }

    public async show({ params }: HttpContextContract) {
        const user = await User.findOrFail(params.id);
        return user;
    }

    public async update({ params, request }: HttpContextContract) {
        const user = await User.findOrFail(params.id);
        const data = request.only(['name', 'email', 'password', 'type', 'status']);
        user.merge(data);
        await user.save();
        return user;
    }

    public async destroy({ params, response }: HttpContextContract) {
        const user = await User.findOrFail(params.id);
        await user.delete();
        return response.status(204);
    }

    public async showUsers({ params }: HttpContextContract) {
        console.log(params);
        return [];
    }

    public async showPublication({ auth, response }: HttpContextContract) {
        var publications = [];
        var publication = [];
        const id = auth.user?.id || 0;

        publication = await Database
            .rawQuery('select a.id, a.ordination, a.media_id, a.user_id, a.group_id, b.type, b.title, b.city, b.directory, b.duration from publications a, medias b where a.media_id = b.id and a.user_id = ? order by a.ordination', [id]);

        publication.map((media) => {
            publications.push(media);
        });

        publication = [];

        publication = await Database
            .rawQuery('select a.id, a.ordination, a.media_id, a.user_id, a.group_id, b.type, b.title, b.city, b.directory, b.duration from publications a, medias b, pleaces c where a.media_id = b.id and a.group_id = c.group_id and c.user_id = ? order by a.ordination', [id]);

        publication.map((media) => {
            publications.push(media);
        });

        if (publications) {
            return publications;
        }
        return response.status(404);
    }
}