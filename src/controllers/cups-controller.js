const { removeEmptyProps } = require('../helpers');
const { createNotFoundError, sendErrorResponse } = require('../helpers/errors');
const CupModel = require('../models/cup-model');

const createCupNotFoundError = (cupId) => createNotFoundError(`Cup with id '${cupId}' was not found`);

const fetchAll = async (req, res) => {
  const { joinBy } = req.query;

  try {
    const cupDocuments = joinBy === 'categoryId'
      ? await CupModel.find().populate('categoryId')
      : await CupModel.find();

    res.status(200).json(cupDocuments);
  } catch (err) { sendErrorResponse(err, res); }
};

const fetch = async (req, res) => {
  const cupId = req.params.id;
  const { joinBy } = req.query;

  try {
    const foundCup = joinBy === 'categoryId'
      ? await CupModel.findById(cupId).populate('categoryId')
      : await CupModel.findById(cupId);
    if (foundCup === null) throw createCupNotFoundError(cupId);

    res.status(200).json(foundCup);
  } catch (err) { sendErrorResponse(err, res); }
};

const create = async (req, res) => {
  const newCupData = req.body;

  try {
    CupModel.validate(newCupData);

    const newCup = await CupModel.create(newCupData)

    res.status(201).json(newCup)

  } catch (err) { sendErrorResponse(err, res); }
};

const replace = async (req, res) => {
  const cupId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newCupData = { title, description, categoryId, img, price };

  try {
    CupModel.validate(newCupData);

    const updatedCup = await CupModel.findByIdAndUpdate(
      cupId,
      newCupData,
      { new: true, runValidators: true }
    );

    if (updatedCup === null) throw createCupNotFoundError(cupId);

    res.status(200).json(updatedCup)

  } catch (err) { sendErrorResponse(err, res); }
};

const update = async (req, res) => {
  const cupId = req.params.id;
  const { title, description, categoryId, img, price } = req.body;
  const newCupData = removeEmptyProps({ title, description, categoryId, img, price });

  try {
    CupModel.validateUpdate(newCupData);

    const updatedCup = await CupModel.findByIdAndUpdate(
      cupId,
      newCupData,
      { new: true }
    );

    if (updatedCup === null) throw createCupNotFoundError(cupId);

    res.status(200).json(updatedCup)

  } catch (err) { sendErrorResponse(err, res); }
};

const remove = async (req, res) => {
  const cupId = req.params.id;

  try {
    const deletedCup = await CupModel.findByIdAndDelete(cupId);
    if (deletedCup === null) createCupNotFoundError(cupId);

    res.status(200).json(deletedCup);
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
