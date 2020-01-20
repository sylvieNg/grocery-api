'use strict';

const express = require('express');
const generalErrorHandler = require('./shared/generalErrorHandler');
const monitorRouter = require('./routes/monitor');
const app = express();

//Monitoring endpoint
app.use('/_ah', monitorRouter);

//configure middlewares
const middlewares = require('./middlewares')(app);
middlewares.configureMiddlewares();

//configure routes
const routerIndex = require('./routes')(app);
routerIndex.registerRoutes();

//configure general error handler
app.use(generalErrorHandler.handleError);

const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'development';

app.listen(port, () => {
    console.log(`Running in: ${env} and listening on port: ${port}`)
});