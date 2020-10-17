import Mail from '../../libs/Mail';
import formatMoney from '../helpers/format';

class DonationMail {
  get key() {
    return 'DonationMail';
  }

  async handle({ data }) {
    const { entityName, entityMail, valueDonated, caseTitle, caseId } = data;

    await Mail.sendMail({
      from: process.env.MAIL_FROM,
      to: entityMail,
      subject: 'Doação recebida!',
      template: 'donation',
      context: {
        entityName,
        valueDonated: formatMoney(valueDonated),
        caseTitle,
        caseLink: `${process.env.WEB_APP_URL}/cases/detail-case/${caseId}`,
        assetsUrl: `${process.env.APP_URL}:${process.env.APP_PORT}/assets`,
      },
    });
  }
}

export default new DonationMail();
