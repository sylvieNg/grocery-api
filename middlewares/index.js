'use strict';
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const apiKeyAuth = require('./apiKeyAuth.global');

class MiddlewareIndex {
    constructor(app) {
        this.app = app;
    }
    configureMiddlewares() {
        //Middlewares
        this.app.options('*', cors()); //enable preflight for all routes

        this.app.use(morgan("combined"));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json({ limit: '5mb' }));
        this.app.use(bodyParser.json());
        this.app.use(cors({
            origin: '*',
            methods: ['GET', 'PUT', 'POST', 'DELETE'],
            allowedHeaders: [
                'X-Requested-With', 'X-HTTP-Method-Override', 'Content-Type',
                'warehouse-token', 'api-key', 'warehouse-authentication', 'Accept'
            ],
            preflightContinue: true
        }));
        this.app.use(apiKeyAuth.comparePublicKey);
    }
}

module.exports = (app) => { return new MiddlewareIndex(app); }