import Publication from 'App/Models/Publication';
import Database from '@ioc:Adonis/Lucid/Database';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class PublicationsController {

    public async index({ request }: HttpContextContract) {
        var group = request.input('group_id');
        var user = request.input('user_id');

        if (group) {
            const data = await Database.rawQuery('select a.*, b.title from publications a, medias b where a.media_id = b.id and a.group_id = ? order by a.ordination', [group]);
            return data;
        } else if (user) {
            const data = await Database.rawQuery('select a.*, b.title from publications a, medias b where a.media_id = b.id and a.user_id = ? order by a.ordination', [user]);
            return data;
        } else {
            const data = await Publication.all();
            return data;
        }
    }

    public async store({ request, response }: HttpContextContract) {
        const data = request.only(['ordination', 'user_id', 'group_id', 'media_id']);
        const publication = await Publication.create(data);
        return response.status(201).send(publication);
    }

    public async show({ params }: HttpContextContract) {
        const publication = await Publication.findOrFail(params.id);
        return publication;
    }

    public async update({ params, request }: HttpContextContract) {
        const publication = await Publication.findOrFail(params.id);
        const data = request.only(['ordination', 'user_id', 'group_id', 'media_id']);
        publication.merge(data);
        await publication.save();
        return publication;
    }

    public async destroy({ params, response }: HttpContextContract) {
        const publication = await Publication.findOrFail(params.id);
        await publication.delete();
        return response.status(204);
    }

    public async process({ request, response }: HttpContextContract) {
        const data = request.only(['group_id', 'user_id', 'medias']);

        try {
            if (data) {
                if (data.group_id) {
                    var deleteMedias = [];
                    deleteMedias = data.medias.filter((media) => (!!media.id));

                    await this.delete(data.group_id, null, deleteMedias);
                    if (deleteMedias.length > 0) {

                        var updateMedias = deleteMedias.map((media: any) => ({
                            id: media.id,
                            ordination: media.ordination,
                            group_id: media.group_id,
                            user_id: media.user_id,
                            media_id: media.media_id
                        }));

                        //    console.log('update:' + updateMedias.length);
                        await this.merge(updateMedias);
                    }

                    var insertMedias = [];
                    insertMedias = data.medias.filter((media) => (media.id === undefined || media.id === null));
                    insertMedias.map((media: any) => ({
                        ordination: media.ordination,
                        group_id: media.group_id,
                        user_id: media.user_id,
                        media_id: media.media_id
                    }));

                    //  console.log('insert:' + insertMedias.length);

                    if (insertMedias.length > 0) {
                        await this.insert(insertMedias);
                    }
                    return response.status(201);

                } else if (data.user_id) {
                    var deleteMedias = [];
                    deleteMedias = data.medias.filter((media) => (!!media.id));

                    await this.delete(null, data.user_id, deleteMedias);
                    if (deleteMedias.length > 0) {

                        var updateMedias = deleteMedias.map((media: any) => ({
                            id: media.id,
                            ordination: media.ordination,
                            group_id: media.group_id,
                            user_id: media.user_id,
                            media_id: media.media_id
                        }));

                        //    console.log('update:' + updateMedias.length);
                        await this.merge(updateMedias);
                    }

                    var insertMedias = [];
                    insertMedias = data.medias.filter((media) => (media.id === undefined || media.id === null));
                    insertMedias.map((media: any) => ({
                        ordination: media.ordination,
                        group_id: media.group_id,
                        user_id: media.user_id,
                        media_id: media.media_id
                    }));

                    // console.log('insert:' + insertMedias.length);

                    if (insertMedias.length > 0) {
                        await this.insert(insertMedias);
                    }
                    return response.status(201);
                } else {
                    return response.status(204);
                }
            } else {
                return response.status(204);
            }
        } catch (error) {
            console.log(error);
            return response.status(204);
        }
    }

    private async delete(group, user, medias) {
        var ids = [0];

        for (let index = 0; index < medias.length; index++) {
            const element = medias[index].id;
            await ids.push(element);
        }

        if (group) {
            await Database.from('publications').where('group_id', group).whereNotIn('id', ids).delete();
        } else if (user) {
            await Database.from('publications').where('user_id', user).whereNotIn('id', ids).delete();
        }
    }

    private async merge(medias) {
        for (let index = 0; index < medias.length; index++) {
            const publication = await Publication.findOrFail(medias[index].id);
            const data = medias[index];
            publication.merge(data);
            await publication.save();
        }
    }

    private async insert(medias) {
        for (let index = 0; index < medias.length; index++) {
            const { ordination, media_id, group_id, user_id } = medias[index];
            await Publication.create({ ordination, media_id, group_id, user_id });
        }
    }
}
