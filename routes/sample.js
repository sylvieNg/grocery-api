'use strict';
var express = require('express');
var router = express.Router();
var logger = require('../shared/logger')('routes:sample');
const SampleHandler = require('../core/sample.handler');

class SampleRouter {
    registerRoutes() {
        router.route('/')
            .post((req, res, next) => {
                const body = req.body;
                let sampleHandler = new SampleHandler();
                sampleHandler.sample(body)
                .then((result) => {
                    res.send(result);
                }).catch((error) => {
                    logger('[SAMPLE] Error: ' + error);
                    next(error);
                });
            });

        router.route('/')
            .get((req, res, next) => {
                let sampleHandler = new SampleHandler();
                sampleHandler.sampleGet()
                .then((result) => {
                    res.send(result.products);
                }).catch((error) => {
                    logger('[SAMPLE] Error: ' + error);
                    next(error);
                });
            });
        router.route('/:id')
            .get(function(req, res){
                let body = req.params;
                let sampleHandler = new SampleHandler();
                sampleHandler.getSelectedProduct(body)
                .then((result) => {
                    res.send(result);
                }).catch((error) => {
                    logger('[SAMPLE] Error: ' + error);
                    next(error);
                });
            });
        return router;
    }
}
    
const sampleRouter = new SampleRouter();
module.exports = sampleRouter.registerRoutes();