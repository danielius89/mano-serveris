const { removeEmptyProps } = require('../helpers');
const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const NewsModel = require('../models/news-model');

const createNewsNotFoundError = (newsId) => createNotFoundError(`News with id '${newsId}' was not found`);

const fetchAll = async (req, res) => {
  const { joinBy } = req.query;

  try {
    const newsDocuments = joinBy === 'categoryId'
      ? await NewsModel.find().populate('categoryId')
      : await NewsModel.find();

    res.status(200).json(newsDocuments);
  } catch (err) { sendErrorResponse(err, res); }
};

const fetch = async (req, res) => {
  const newsId = req.params.id;
  const { joinBy } = req.query;

  try {
    const foundNews = joinBy === 'categoryId'
      ? await NewsModel.findById(newsId).populate('categoryId')
      : await NewsModel.findById(newsId);
    if (foundNews === null) throw createNewsNotFoundError(newsId);

    res.status(200).json(foundNews);
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newNewsData = req.body;

  try {
    NewsModel.validate(newNewsData);

    const newNews = await NewsModel.create(newNewsData)

    res.status(201).json(newNews)

  } catch (err) { sendErrorResponse(err, res); }
};

const replace = async (req, res) => {
  const newsId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newNewsData = { title, description, categoryId, img, price };

  try {
    NewsModel.validate(newNewsData);

    const updatedNews = await NewsModel.findByIdAndUpdate(
      newsId,
      newNewsData,
      { new: true, runValidators: true }
    );

    if (updatedNews === null) throw createNewsNotFoundError(newsId);

    res.status(200).json(updatedNews)

  } catch (err) { sendErrorResponse(err, res); }
};

const update = async (req, res) => {
  const newsId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newNewsData = removeEmptyProps({ title, description, categoryId, img, price });

  try {
    NewsModel.validateUpdate(newNewsData);

    const updatedNews = await NewsModel.findByIdAndUpdate(
      newsId,
      newNewsData,
      { new: true }
    );

    if (updatedNews === null) throw createNewsNotFoundError(newsId);

    res.status(200).json(updatedNews)

  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const newsId = req.params.id;

  try {
    const deletedNews = await NewsModel.findByIdAndDelete(newsId);
    if (deletedNews === null) createNewsNotFoundError(newsId);

    res.status(200).json(deletedNews);
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
