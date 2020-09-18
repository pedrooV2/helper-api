import * as Yup from 'yup';

export default async (request, response, next) => {
  try {
    const schema = Yup.object().shape({
      value: Yup.number().positive().required(),
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
