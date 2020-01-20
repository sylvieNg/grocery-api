'use strict';

class ResponseHelper {
    addCustomHeader(res, header, value) {
        let exposeHeaders = res.header['Access-Control-Expose-Headers'];
        if (exposeHeaders) {
            exposeHeaders += `, ${header}`;
            
        } else {
            exposeHeaders = header;
        }
        res.header('Access-Control-Expose-Headers', exposeHeaders);
        res.header(header,value);
    }
}

module.exports = new ResponseHelper();