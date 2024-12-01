import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().required()
});

const bookSchema = Joi.object({
  name: Joi.string().required()
});

const returnBookSchema = Joi.object({
  score: Joi.number().min(1).max(10).required()
});

export {
  userSchema,
  bookSchema,
  returnBookSchema
};
