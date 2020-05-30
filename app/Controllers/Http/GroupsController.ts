import Group from 'App/Models/Group';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class GroupsController {

    public async index() {
        const data = await Group.query().preload('pleaces');
        return data;
    }

    public async store({ auth, request, response }: HttpContextContract) {
        const data = request.only(['description']);
        const group = await Group.create({ ...data, user_id: auth.user?.id });
        return response.status(201).send(group);
    }

    public async show({ params, response }: HttpContextContract) {
        const group = await Group.query().where('id', params.id).preload('pleaces');

        if (!!group) {
            return group;
        } else {
            return response.status(404);
        }
    }

    public async update({ auth, params, request }: HttpContextContract) {
        const group = await Group.findOrFail(params.id);
        const data = request.only(['description']);
        group.merge({ ...data, user_id: auth.user?.id });
        await group.save();
        return group;
    }

    public async destroy({ params, response }: HttpContextContract) {
        const group = await Group.findOrFail(params.id);
        await group.delete();
        return response.status(204);

    }
}
