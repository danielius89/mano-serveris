const { Router } = require('express');
const categoriesRouter = require('./categories-router');
const newsRouter = require('./news-router');

const apiRouter = Router();

apiRouter.use('/news', newsRouter);
apiRouter.use('/categories', categoriesRouter);

module.exports = apiRouter;
