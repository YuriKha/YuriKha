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
            subject: 'Your contact request have been recived', 
            html: `
            <p>Dear ${body.firstName} ${body.lastName} we received your contact request</p>
            <h5>The contact request as follow:</h5>
            <p>First name: ${body.firstName}<br>
               Last name: ${body.lastName}<br>
               Email: ${body.email}<br>
               Phone number: ${body.phone}<br>
               JobID: ${body.JobNumber}<br>
               Content: ${body.msgContent}</p>
            `
        };
               
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log('Error Occurs  could NOT send the Email' + err);
            } else {
                console.log('Email sent to user successfully');
            }
        });
    }
}

