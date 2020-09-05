import fs from 'fs';
import Axios from 'axios';
import { resolve } from 'path';
import crypto from 'crypto';

export default async (url, callback) => {
  const path = resolve(__dirname, '..', 'tmp');

  if (!fs.existsSync(path)) {
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) throw err;
    });
  }

  const filename = () => {
    const bytes = crypto.randomBytes(14).toString('hex');
    return `${bytes}${new Date().getTime()}.jpg`;
  };

  const filepath = `${path}/${filename()}`;

  const writer = fs.createWriteStream(filepath);

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  callback();
  return filepath;
};
