import * as Yup from 'yup';

export default async (request, response, next) => {
  try {
    const schema = Yup.object().shape({
      nickname: Yup.string().required(),
      number: Yup.string()
        .matches(/^\d{16}$/g)
        .required(),
      cvv: Yup.string()
        .matches(/^\d{3}$/g)
        .required(),
      cpf: Yup.string()
        .matches(/^\d{11}$/g)
        .required(),
      expiration_date: Yup.string().matches(/^\d{2}\/\d{2}$/g),
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
