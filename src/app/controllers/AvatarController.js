import Avatar from '../models/Avatar';

class AvatarController {
  async store(request, response) {
    const { originalname: original_name, filename: filepath } = request.file;

    const avatar = await Avatar.create({
      original_name,
      filepath,
    });

    return response.status(201).json(avatar);
  }
}

export default new AvatarController();
