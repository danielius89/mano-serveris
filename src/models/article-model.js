const { Schema, Types, model } = require('mongoose');
const yup = require('yup');

const articleSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
});

const articleValidationSchema = yup.object().shape({
  title: yup
    .string().typeError('Article.title must be a string')
    .required('Article.title is required'),
  description: yup
    .string().typeError('Article.description must be a string')
    .required('Article.description is required'),
  categoryId: yup
    .string().typeError('Article.categoryId must be a string')
    .test(
      'is-mongo-object-id',
      'Article.categoryId must be valid MongoDB object Id',
      Types.ObjectId.isValid
    )
    .required('Article.categoryId is required'),
  img: yup
    .string().typeError('Article.img must be a string')
    .required('Article.img is required'),
  price: yup
    .number().typeError('Article.price must be a number')
    .required('Article.price is required')
    .positive('Article.price must be positive')
});

const articleUpdateValidationSchema = yup.object().shape({
  title: yup.string().typeError('Article.title must be a string'),
  description: yup.string().typeError('Article.description must be a string'),
  categoryId: yup.string().typeError('Article.categoryId must be a string')
    .test(
      'is-mongo-object-id',
      'Article.categoryId must be valid MongoDB object Id',
      Types.ObjectId.isValid
    ),
  img: yup.string().typeError('Article.img must be a string'),
  price: yup.number()
    .typeError('Article.price must be a number')
    .positive('Article.price must be positive'),
});

articleSchema.statics.validate = (articleData) => articleValidationSchema.validateSync(articleData)
articleSchema.statics.validateUpdate = (articleData) => articleUpdateValidationSchema.validateSync(articleData)

const ArticleModel = model('Article', articleSchema);

module.exports = ArticleModel;