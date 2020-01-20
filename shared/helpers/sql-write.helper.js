'use strict'
var db = require('../../connection/connect');

class SqlWriteHelper {
    create(table, data) {
        return new Promise((resolve, reject) => {
            db[table].create(data)
            .then((res) => {
                resolve(res);
            }).catch((error) => {
                reject(error);
            })
        }); 
    }
}

module.exports = SqlWriteHelper;