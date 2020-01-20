'use strict';
const sampleRouter = require('./sample');

class RouterIndex {
    constructor(app) {
        this.app = app;
    }

    registerRoutes() {
        this.app.use('/products', sampleRouter);
    }
}

module.exports = (app) => { return new RouterIndex(app) };