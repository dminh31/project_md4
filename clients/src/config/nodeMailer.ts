import * as nodeMailer from 'nodemailer';
import { mailConfig } from '../config/nod';
import * as dotenv from 'dotenv';
dotenv.config();

export const sendMail = (to: string, subject: string, htmlContent: string): Promise<any> => {
    const transport = nodeMailer.createTransport({
        host: mailConfig.HOST,
        port: mailConfig.PORT,
        secure: false,
        auth: {
            user: mailConfig.USERNAME,
            pass: mailConfig.PASSWORD,
        }
    });

    const options: nodeMailer.SendMailOptions = {
        from: mailConfig.FROM_ADDRESS,
        to: to,
        subject: subject,
        html: htmlContent
    };
    return transport.sendMail(options);
};