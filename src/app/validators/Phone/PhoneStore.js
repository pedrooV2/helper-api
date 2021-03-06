import * as Yup from 'yup';

export default async (request, response, next) => {
  try {
    const schema = Yup.object().shape({
      phone: Yup.string()
        .matches(/^\d{11}$/, 'Is not in correct format')
        .required(),
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
