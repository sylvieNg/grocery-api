'use strict'

class MssqlHelper {
    initialize() {
        return new Promise((resolve, reject) => {
            sequelize.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
                resolve(true);
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
                resolve(false);
            });
        });
    }

    query(sql) {
        return new Promise((resolve, reject) => {
            this.initialize().then(() => {
                sequelize.query(sql, { type: sequelize.QueryTypes.SELECT})
                .then((val) => {
                    resolve(val);
                });
            })
           
        });
    }
}

module.exports = MssqlHelper;