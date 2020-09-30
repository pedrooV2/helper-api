import nodemailer from 'nodemailer';

import mailConfig from '../config/mail';

class Mail {
  constructor() {
    this.transporter = nodemailer.createTransport({
      ...mailConfig,
    });
  }

  sendMail(options) {
    return this.transporter.sendMail(options);
  }
}

export default new Mail();
