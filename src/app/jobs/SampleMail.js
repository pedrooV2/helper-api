import Mail from '../../libs/Mail';

class SampleMail {
  get key() {
    return 'SampleMail';
  }

  async handle({ data }) {
    const { name, email, githubLink } = data;

    await Mail.sendMail({
      from: '"Fred Foo" <foo@example.com>',
      to: 'bar@example.com, baz@example.com',
      subject: 'A mail with nodemailer and handlebars',
      template: 'sample',
      context: {
        name,
        email,
        githubLink,
      },
    });
  }
}

export default new SampleMail();
