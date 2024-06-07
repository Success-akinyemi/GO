import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'
import { config } from 'dotenv'
config()

//https://ethereal.email/create
let nodeConfig = {
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER, // generated ethereal user
      pass: process.env.NODEMAILER_PASSWORD, // generated ethereal password
    },
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: process.env.MAIL_WEBSITE_NAME || 'GO',
        link: process.env.MAIL_WEBSITE_LINK || 'https://go-wlli.onrender.com'
    }
})

/**POST http://localhost:9000/api/registerMail 
 * @param" {
 * "username": "success",
 * "userEmail": "success123@gmail.com",
 * "text": "",
 * "subject": ""
 * }
*/
/**

 */

export const registerMail = async ({ username, userEmail, subject, instructions, outro, verifyUrl, text, intro }) => {
    const email = {
        body: {
            name: username || 'New User',
            intro: intro,
            action: {
                instructions: instructions,
                button: {
                    color: '#014601',
                    text: text,
                    link: verifyUrl || ''
                }
            },
            outro: outro
        }
    };

    const emailBody = MailGenerator.generate(email);

    const message = {
        from: process.env.NODEMAILER_USER,
        to: userEmail,
        subject: subject || 'Signup Successfully',
        html: emailBody
    };

    transporter.sendMail(message)
        .then(() => {
            console.log('Email sent successfully');
        })
        .catch(error => {
            console.log('Error sending email:', error);
            throw new Error('Error sending email');
        });
};