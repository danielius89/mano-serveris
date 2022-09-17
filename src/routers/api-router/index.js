const { Router } = require('express');
const categoriesRouter = require('./categories-router');
const cupsRouter = require('./cups-router');

const apiRouter = Router();

apiRouter.use('/cups', cupsRouter);
apiRouter.use('/categories', categoriesRouter);

module.exports = apiRouter;
