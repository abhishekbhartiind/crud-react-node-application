const moment = require("moment-timezone");
const HttpStatus = require('../errors/HttpStatusCodes')

module.exports = {
    SERVER_ERROR_MSG: "SERVER ERROR",
    AUTH_ERROR_MSG: "AUTHORISATION RESTRICTED",
    DATA_MISSING: "DATA MISSING",

    throwError: (res, statusCode, message) => {
        res.status(statusCode).json({
            status: "FAILED",
            message: message
        })
    },

    success: (res, result) => {
        res.status(HttpStatus.OK).json({
            status: "SUCCESS",
            result,
        });
    },

    getCurDate: () => {
        return moment(new Date()).tz("Asia/Kolkata").format("Y-MM-DD");
    },

    getCurTime: () => {
        return moment(new Date()).tz("Asia/Kolkata").format("HH:mm:ss");
    }
}