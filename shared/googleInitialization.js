'use strict'

const config = require('config');
var storage = require('@google-cloud/storage')

class GoogleInitialization{
    initialize(){
        const gcs = storage({
            projectId: config.firebase.projectId,
            keyFilename: config.googleCloud.keyfile
        });
        return gcs;
    }
}

module.exports = new GoogleInitialization(); 