'use strict';
var express = require('express');
var router = express.Router();
var logger = require('../shared/logger')('routes:monitor');
const os = require('os');

class MonitorRouter {
    registerRoutes() {
        router.route('/health')
            .get((req, res, next) => {
                logger(req.get('host'));
                let freeMem = os.freemem();
                let totalMem = os.totalmem();
                let averageLoad = os.loadavg();
                let totalCPUs = os.cpus();
                let uptime = os.uptime();
                let healthString = `free mem: ${freeMem}<br>total mem: ${totalMem}<br>used mem: ${totalMem - freeMem}<br>used mem ratio: ${(totalMem - freeMem)/totalMem}<br>average load: ${averageLoad}<br>cpus: ${totalCPUs.length}<br>uptime: ${uptime}`;
                res.send(healthString);
            });

        return router;
    }
}

const monitorRouter = new MonitorRouter();
module.exports = monitorRouter.registerRoutes();