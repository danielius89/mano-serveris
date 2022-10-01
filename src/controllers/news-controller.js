const { removeEmptyProps } = require('../helpers');
const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const ArticleModel = require('../models/article-model');

const createArticleNotFoundError = (articleId) => createNotFoundError(`Article with id '${articleId}' was not found`);

const fetchAll = async (req, res) => {
  const { joinBy } = req.query;

  try {
    const articleDocuments = joinBy === 'categoryId'
      ? await ArticleModel.find().populate('categoryId')
      : await ArticleModel.find();

    res.status(200).json(articleDocuments);
  } catch (err) { sendErrorResponse(err, res); }
};

const fetch = async (req, res) => {
  const articleId = req.params.id;
  const { joinBy } = req.query;

  try {
    const foundArticle = joinBy === 'categoryId'
      ? await ArticleModel.findById(articleId).populate('categoryId')
      : await ArticleModel.findById(articleId);
    if (foundArticle === null) throw createArticleNotFoundError(articleId);

    res.status(200).json(foundArticle);
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newArticleData = req.body;

  try {
    ArticleModel.validate(newArticleData);

    const newArticle = await ArticleModel.create(newArticleData)

    res.status(201).json(newArticle)

  } catch (err) { sendErrorResponse(err, res); }
};

const replace = async (req, res) => {
  const articleId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newArticleData = { title, description, categoryId, img, price };

  try {
    ArticleModel.validate(newArticleData);

    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      articleId,
      newArticleData,
      { new: true, runValidators: true }
    );

    if (updatedArticle === null) throw createArticleNotFoundError(articleId);

    res.status(200).json(updatedArticle)

  } catch (err) { sendErrorResponse(err, res); }
};

const update = async (req, res) => {
  const articleId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newArticleData = removeEmptyProps({ title, description, categoryId, img, price });

  try {
    ArticleModel.validateUpdate(newArticleData);

    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      articleId,
      newArticleData,
      { new: true }
    );

    if (updatedArticle === null) throw createArticleNotFoundError(articleId);

    res.status(200).json(updatedArticle)

  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const articleId = req.params.id;

  try {
    const deletedArticle = await ArticleModel.findByIdAndDelete(articleId);
    if (deletedArticle === null) createArticleNotFoundError(articleId);

    res.status(200).json(deletedArticle);
  } catch (err) { sendErrorResponse(err, res); }
};

module.exports = {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
};
