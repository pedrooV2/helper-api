import Mail from '../../libs/Mail';
import Entity from '../models/Entity';

class DonationMail {
  get key() {
    return 'DonationMail';
  }

  async handle({ data }) {
    const { entityId, valueDonated, caseTitle, caseId } = data;

    const entity = await Entity.findByPk(entityId);

    await Mail.sendMail({
      from: process.env.MAIL_FROM,
      to: entity.email,
      subject: 'Doação recebida!',
      template: 'donation',
      context: {
        entityName: entity.name,
        valueDonated,
        caseTitle,
        caseLink: `${process.env.WEB_APP_URL}/cases/detail-case/${caseId}`,
      },
    });
  }
}

export default new DonationMail();
