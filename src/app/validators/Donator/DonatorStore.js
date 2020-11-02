import * as Yup from 'yup';

export default async (request, response, next) => {
  try {
    const schema = Yup.object().shape({
      full_name: Yup.string().required(),
      email: Yup.string().email().required(),
      phone: Yup.string().required(),
      password: Yup.string().min(6).required(),
      state: Yup.string().length(2).required(),
      city: Yup.string().max(25).required(),
      avatar_id: Yup.number(),
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
