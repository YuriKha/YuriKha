const nodemailer = require('nodemailer');

require('dotenv').config();

module.exports={
    SendEmail:(to,subject,body)=>{
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.PROJECT_EMAIL,  
                pass: process.env.PROJECT_PASS.toString()  
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        
        let mailDetails = {
            from: process.env.PROJECT_EMAIL,                        
            to: to,                                                 
            subject: 'New contact just recived',
            html: `
            <p>You got new contact request :</p>
            First name: ${body.firstName}<br>
            Last name: ${body.lastName}<br>
            Email: ${body.email}<br>
            `
        };
               
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log('Error Occurs  could NOT send the Email' + err);
            } else {
                console.log('Email sent to Admin successfully');
            }
        });
    }
}

