'use strict';
const config = require('config');

class CronAuth {
    verify(req, res, next) {
        try {
            let appEngineCron = req.header('X-Appengine-Cron');
            let cronToken = req.query.token;
            appEngineCron = appEngineCron == 'true' || cronToken === config.cronKey ;
            if (!appEngineCron) {
                throw new Error(`invalid cron token`);
            } else {
                res.locals.cron = true;
                next();
            }
        }
        catch (err) {
            console.error(err);
            next(104);
        }
    }
}

module.exports = new CronAuth();