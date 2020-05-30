import Media from 'App/Models/Media';
//import { schema } from '@ioc:Adonis/Core/Validator';
import Application from '@ioc:Adonis/Core/Application';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

var IMAGE: import('@ioc:Adonis/Core/BodyParser').MultipartFileContract | null;
var VIDEO: import('@ioc:Adonis/Core/BodyParser').MultipartFileContract | null;

var fs = require('fs');

export default class MediasController {

    public async index() {
        const data = await Media.query().select('*').from('medias').orderBy('id', 'desc');
        return data;
    }

    public async store({ auth, request, response }: HttpContextContract) {

        // const userSchema = schema.create({
        //     email: schema.string(),
        //     avatar: schema.file({
        //       size: '2mb',
        //       extnames: ['jpg', 'png', 'jpeg'],
        //     }),
        //   });

        // const messages = {
        //     'avatar.file.extname': 'You can only upload images',
        //     'avatar.file.size': 'Image size must be under 2mb',
        //   };

        // const data = await request.validate({
        //     schema: validator.compile(userSchema),
        //     messages,
        // });

        IMAGE = request.file('IMAGE', {
            size: '2mb',
            extnames: ['jpg', 'png', 'jpeg']
        });

        if (IMAGE) {
            const name = `${new Date().getTime()}-${IMAGE.clientName}`;
            const data = request.only(['type', 'title', 'city', 'duration', 'directory']);
            const media = await Media.create({
                title: IMAGE.clientName,
                directory: name,
                user_id: auth.user?.id,
                type: 'IMAGE',
                ...data
            });

            await IMAGE.move(Application.publicPath('uploads'), {
                name,
            });
            return response.status(201).send(media);
        }

        VIDEO = request.file('VIDEO', {
            size: '20mb',
            extnames: ['mp4']
        });

        if (VIDEO) {
            const name = `${new Date().getTime()}-${VIDEO.clientName}`;
            const data = request.only(['type', 'title', 'city', 'duration', 'directory']);
            const media = await Media.create({
                title: VIDEO.clientName,
                directory: name,
                user_id: auth.user?.id,
                type: 'VIDEO',
                ...data
            });

            await VIDEO.move(Application.publicPath('uploads'), {
                name
            });
            return response.status(201).send(media);
        }

        const data = request.only(['type', 'title', 'city', 'duration']);
        const media = await Media.create({ ...data, user_id: auth.user?.id });
        return response.status(201).send(media);
    }

    public async show({ params }: HttpContextContract) {
        const media = await Media.findOrFail(params.id);
        return media;
    }

    public async update({ auth, params, request }: HttpContextContract) {
        const media = await Media.findOrFail(params.id);

        IMAGE = request.file('IMAGE', {
            size: '2mb',
            extnames: ['jpg', 'png', 'jpeg']
        });

        if (IMAGE) {
            const name = `${new Date().getTime()}-${IMAGE.clientName}`;
            const data = request.only(['type', 'title', 'city', 'duration', 'directory']);
            const media = await Media.create({
                title: IMAGE.clientName,
                directory: name,
                user_id: auth.user?.id,
                type: 'IMAGE',
                ...data
            });

            await IMAGE.move(Application.publicPath('uploads'), {
                name,
            });
            return media;
        }

        VIDEO = request.file('VIDEO', {
            size: '20mb',
            extnames: ['mp4']
        });

        if (VIDEO) {
            const name = `${new Date().getTime()}-${VIDEO.clientName}`;
            const data = request.only(['type', 'title', 'city', 'duration', 'directory']);
            const media = await Media.create({
                title: VIDEO.clientName,
                directory: name,
                user_id: auth.user?.id,
                type: 'VIDEO',
                ...data
            });

            await VIDEO.move(Application.publicPath('uploads'), {
                name
            });
            return media;
        }

        const data = request.only(['type', 'title', 'city', 'duration', 'directory']);
        media.merge({ ...data, user_id: auth.user?.id });
        await media.save();
        return media;
    }

    public async destroy({ params, response }: HttpContextContract) {
        const media = await Media.findOrFail(params.id);
        await media.delete();
        fs.unlink(`${Application.publicPath('uploads')}/${media.directory}`, () => { });
        return response.status(204);
    }

    public async destroyFile({ params, response }: HttpContextContract) {
        const media = await Media.findOrFail(params.id);
        const file = media.directory;
        media.directory = "";
        await media.save();
        fs.unlink(`${Application.publicPath('uploads')}/${file}`, () => { });
        return response.status(204);
    }
}
