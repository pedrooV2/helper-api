import nodemailer from 'nodemailer';
import expressHbs from 'express-handlebars';
import nodemailerExpressHbs from 'nodemailer-express-handlebars';
import { resolve } from 'path';

import mailConfig from '../config/mail';

class Mail {
  constructor() {
    this.transporter = nodemailer.createTransport({
      ...mailConfig,
    });

    this.template();
  }

  template() {
    const templatePath = resolve(__dirname, '..', 'resources', 'mail');

    this.transporter.use(
      'compile',
      nodemailerExpressHbs({
        viewEngine: expressHbs.create({
          layoutsDir: resolve(templatePath, 'layouts'),
          partialsDir: resolve(templatePath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath: templatePath,
        extName: '.hbs',
      })
    );
  }

  sendMail(options) {
    return this.transporter.sendMail(options);
  }
}

export default new Mail();
