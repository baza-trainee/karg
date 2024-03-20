import nodemailer from 'nodemailer';

const email = process.env.EMAIL
const pass = process.env.PASSWORD
const host = process.env.SMTP_HOST

export function sendMail(subject, toEmail, htmlContent) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: host, 
            port: 465, 
            secure: true, 
            auth: {
                user: email,
                pass: pass,
            },
        });

        const mailOptions = {
            from: email,
            to: toEmail,
            subject: subject,
            html: htmlContent,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log('Email sent successfully', info);
                resolve(info);
            }
            transporter.close();
        });
    });
}


