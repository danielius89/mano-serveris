const { Schema, Types, model } = require('mongoose');
const yup = require('yup');

const articleSchema = Schema({
  articleTitle: {
    type: String,
    required: true,
  },
  articleContent: {
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
  author: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

const articleValidationSchema = yup.object().shape({
  articleTitle: yup
    .string().typeError('Article.articleTitle must be a string')
    .required('Article.articleTitle is required'),
  articleContent: yup
    .string().typeError('Article.articleContent must be a string')
    .required('Article.articleContent is required'),
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
  author: yup
    .string().typeError('Article.author must be a string')
    .required('Article.author is required')
});

const articleUpdateValidationSchema = yup.object().shape({
  articleTitle: yup.string().typeError('Article.articleTitle must be a string'),
  articleContent: yup.string().typeError('Article.articleContent must be a string'),
  categoryId: yup.string().typeError('Article.categoryId must be a string')
    .test(
      'is-mongo-object-id',
      'Article.categoryId must be valid MongoDB object Id',
      Types.ObjectId.isValid
    ),
  img: yup.string().typeError('Article.img must be a string'),
  author: yup.string()
    .typeError('Article.author must be a string'),
});

articleSchema.statics.validate = (articleData) => articleValidationSchema.validateSync(articleData)
articleSchema.statics.validateUpdate = (articleData) => articleUpdateValidationSchema.validateSync(articleData)

const ArticleModel = model('Article', articleSchema);

module.exports = ArticleModel;