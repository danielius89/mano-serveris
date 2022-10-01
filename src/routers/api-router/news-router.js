const { Router } = require('express');
const {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
} = require('../../controllers/cups-controller');

const newsRouter = Router();

newsRouter.get('/', fetchAll);

newsRouter.get('/:id', fetch);

newsRouter.post('/', create);

newsRouter.put('/:id', replace);

newsRouter.patch('/:id', update);

newsRouter.delete('/:id', remove);

module.exports = newsRouter;
