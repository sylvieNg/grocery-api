'use strict';
const AuthApiHelper = require('../shared/helpers/authApiHelper');
const config = require('config');
const jwt = require('jsonwebtoken');
const FirebaseHelper = require('../shared/helpers/firebaseHelper');

class WarehouseAuth {
    verifyCredential(req, res, next) {
        let warehouseAuth = req.header('warehouse-authentication');
        let warehouseKey = req.header('api-key');
        try {
            if (!warehouseAuth) {
                throw new Error('warehouse-authentication token not found');
            } else {
                res.locals.warehouseAuth = warehouseAuth;
                next();
            }
        } catch (err) {
            console.error('error occured in warehouseAuth [verifyCredential]', err);
            next(103);
        }
    }

    verifyToken(req, res, next) {
        let apiKey = req.header('api-key');
        let warehouseToken = req.header('warehouse-token');
        let warehouseIdToken = req.header('warehouse-id-token');
        const authApiHelper = new AuthApiHelper();
        if (warehouseIdToken === undefined) {
            const headers = {
                'api-key': config.authApiKey,
                'warehouse-token': warehouseToken
            };
            if(jwt.decode(warehouseToken) == undefined || jwt.decode(warehouseToken) == null){
                next(102);
                throw new Error("INVALID_TOKEN");
            }
    
            let claims = jwt.decode(warehouseToken).claims;      
            //Client ID from auth service
            let clientId = JSON.parse(claims.user.clientId).warehouse;
            res.locals.uid = clientId;
            res.locals.token = warehouseToken;
            
            authApiHelper.post('verify', headers)
            .then((response)=>{
                try {
                    if(response.statusCode === 200){
                        res.locals.token = warehouseToken;
                        next();
                    }else{
                        throw new Error(response.message);
                    }
                } catch (err) {
                    console.error('error occured in warehouseAuth [verifyToken]', err);
                    next(102);
                }
            });
        } else {
            //partial workaround to use firebase id token for verification
            let fb = new FirebaseHelper();
            fb.verifyIdToken(warehouseIdToken)
                .then((uid) => {
                    res.locals.uid = uid;
                    //create a temporary short lived jsonwebtoken to be used by other services
                    let _token = authApiHelper.getMUVToken(uid, 'warehouse');
                    res.locals.token = _token;
                    next();
                }).catch((err) => {
                    console.error('error occured in warehouseAuth [verifyToken]', err);
                    next(102);
                })
        }
    }
}

module.exports = new WarehouseAuth();