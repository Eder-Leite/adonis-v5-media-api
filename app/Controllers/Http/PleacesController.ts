import Pleace from 'App/Models/Pleace';
import Database from '@ioc:Adonis/Lucid/Database';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class PleacesController {

    public async index() {
        const data = await Database.rawQuery('select a.id, a.user_id, a.group_id, a.created_at, a.updated_at, b.name, c.description from pleaces a, users b, groups c where a.user_id = b.id and a.group_id = c.id order by a.id');
        return data;
    }

    async store({ request, response }: HttpContextContract) {
        const data = request.only(['user_id', 'group_id']);
        const pleace = await Pleace.create(data);
        return response.status(201).send(pleace);
    }

    async show({ params }: HttpContextContract) {
        const pleace = await Pleace.findOrFail(params.id);
        return pleace;
    }

    async update({ params, request }: HttpContextContract) {
        const pleace = await Pleace.findOrFail(params.id);
        const data = request.only(['user_id', 'group_id']);
        pleace.merge(data);
        await pleace.save();
        return pleace;
    }

    async destroy({ params, response }: HttpContextContract) {
        const pleace = await Pleace.findOrFail(params.id);
        await pleace.delete();
        return response.status(204);

    }
}
