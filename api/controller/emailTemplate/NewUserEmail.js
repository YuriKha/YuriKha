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
            subject: 'Welcome, you registered successfully', 
            html: `
            <p>Dear ${body.firstName} ${body.lastName} you are now a member !</p>
            <h5>Personal details in out system are:</h5>
            <p>First name: ${body.firstName}<br>
               Last name: ${body.lastName}<br>
               Email: ${body.email}<br>
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

