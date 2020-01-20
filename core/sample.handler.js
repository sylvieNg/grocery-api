'use strict';
const logger = require('../shared/logger')('core:warehouse:sample.handler');
const dataPath = '/data/database.json';
const fs = require('fs')

class SampleHandler {
    sample(params) {
        return new Promise((resolve, reject) => {
            fs.readFile(process.cwd() + dataPath, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
                data = JSON.parse(data);
                const userId = parseInt(params.id -1);
                data.products[userId] = params;
                fs.writeFile(process.cwd() + dataPath, JSON.stringify(data), 'utf8', (err) => {
                    if (err) {
                        throw err;
                    }
                    
                    // callback();
                    resolve(true)
                });
            });
        });
    }

    sampleGet() {
        return new Promise((resolve, reject) => {
            fs.readFile(process.cwd() + dataPath, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
                resolve(JSON.parse(data))
            });
        });
    }

    getSelectedProduct(params) {
        return new Promise((resolve, reject) => {
            fs.readFile(process.cwd() + dataPath, 'utf8', (err, data) => {
                if (err) {
                    throw err;
                }
                resolve(JSON.parse(data).products[parseInt(params.id -1)])
            });
        });
    }
}

module.exports = SampleHandler;