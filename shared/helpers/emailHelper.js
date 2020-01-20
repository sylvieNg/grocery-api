'use strict'
const _ = require('lodash');
const config = require('config');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const fs = require('fs');
const host = config.email.host;
const port = config.email.port;
const user = config.email.emailAddress;
const pass = config.email.password;
const userName = config.email.emailName;
const moment = require('moment');

const smtpConfig = {
    host,
    port,
    secure: true, // use SSL
    auth: { user, pass }
};

class EmailHelper {

    confirmResetPasswordEmail(data) {
        if (!data.name) {
            data.name = `Sir/Madam`;
        }
        return {
            subject: `WAREHOUSE ALERT - Password reset confirmation`,
            content: `<p>Dear ${data.name},</p>
                <p>Click <a href="${config.api}/external-links/reset-password/${data.email}">here</a> to get the reset password.</p>
                <p>To recover your password, please login with the new password and change your password.</p>
                <p>Thank you very much.</p>`
        }
    }

    resetPasswordEmail(data) {
        if (!data.name) {
            data.name = `Sir/Madam`;
        }
        return {
            subject: `WAREHOUSE ALERT - Password reset`,
            content: `<p>Dear ${data.name},</p>
                <p>Reset password: <b>${data.resetPassword}</b></p>
                <p>Thank you very much.</p>`
        }
    }

    signUpOtpEmail(data) {
        if (!data.name) {
            data.name = `Sir/Madam`;
        }
        return {
            subject: `WAREHOUSE ALERT - One Time Passkey Verification`,
            content: `<p>Dear ${data.name},</p>
                <p>Please click <a href="${config.api}/external-links/verify/otp/${data.otp}/${data.warehouseAuth}">here</a> verify you account.</p>
                <p>Thank you for your registration. Please validate your account.</p>`
        }
    }

    emailContentRouter(type, data) {
        switch (type) {
            case 'signUpOtpEmail':
                return this.signUpOtpEmail(data)
            case 'resetPasswordEmail':
                return this.resetPasswordEmail(data)
            case 'confirmResetPasswordEmail':
                return this.confirmResetPasswordEmail(data)
            default:
                break;
        }
    }

    sendNoReplyEmail(type, receivers, cc, bcc, data) {
        return new Promise((resolve, reject) => {
            // create reusable transporter object using the default SMTP transport
            var transporter = nodemailer.createTransport(smtpTransport(smtpConfig));
            const emailContentRouter = this.emailContentRouter(type, data);
            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: `"${userName}" <${user}>`, // sender address
                to: receivers,
                cc,
                bcc, // list of receivers
                subject: emailContentRouter.subject, // Subject line
                html: emailContentRouter.content // html body
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.error('error occured in email-helper', error);
                    reject(error);
                }
                resolve(info.response)
            });
        }).catch((err) => {
            reject(err);
        })
    }
}

module.exports = EmailHelper;