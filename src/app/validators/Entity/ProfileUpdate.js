import * as Yup from 'yup';

export default async (request, response, next) => {
  try {
    if (Object.keys(request.body).length <= 0) {
      return response.status(400).json({ error: 'No body sent' });
    }

    const schema = Yup.object().shape({
      cnpj: Yup.string(),
      initials: Yup.string(),
      description: Yup.string(),
      whatsapp: Yup.string().required(),
      street: Yup.string(),
      number: Yup.string(),
      neighborhood: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      avatar_id: Yup.number().positive(),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  } catch (error) {
    return response.status(400).json({
      error: 'Validation fails',
      messages: error.inner,
    });
  }
};
