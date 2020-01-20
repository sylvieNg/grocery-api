'use strict';
const config = require('config')
const logger = require('../shared/logger')('middlewares:publicKeyAuth');

class ApiKeyAuth {
    comparePublicKey(req, res, next) {
        if (config.apiKey == req.header('api-key')) {
            next();
        } else {
            next(100);
        }
    };
}

module.exports = new ApiKeyAuth();