const { Router } = require('express');
const {
  fetchAll,
  fetch,
  create,
  replace,
  update,
  remove,
} = require('../../controllers/news-controller');

const cupsRouter = Router();

cupsRouter.get('/', fetchAll);

cupsRouter.get('/:id', fetch);

cupsRouter.post('/', create);

cupsRouter.put('/:id', replace);

cupsRouter.patch('/:id', update);

cupsRouter.delete('/:id', remove);

module.exports = cupsRouter;
