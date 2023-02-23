const contact=require('../model/contact');//גישה למודל שלי 

const mongoose=require('mongoose');  //גישה לספריה שעובדת עם מונגו

require('dotenv').config();//גישה לקובץ .env

//-------------------------------------------------------------

module.exports={
    Contact:async(req,res)=>{
        const Fname = req.body.firstName;
        const Lname = req.body.lastName;
        const Email = req.body.email;
        const Phone = req.body.phone;
        const JobNumber = req.body.JobNumber;
        const Content = req.body.msgContent;
        try{
            const saveContact = await new contact({
                _id:new mongoose.Types.ObjectId(),
                Fname,
                Lname,
                Email,
                Phone,
                JobNumber,
                Content
            });  
            await saveContact.save();  
           
            console.log("New contact recived " , saveContact);

            // ---- שליחת מייל למשתמש ולאדמין ----
            require('./emailTemplate/NewContactEmail').SendEmail(Email,req.body,req.body);
            require('./emailTemplate/NotifyAdminContact').SendEmail(process.env.PROJECT_EMAIL,req.body,req.body);
            
            return res.status(200).json({Msg:"We got your contact " + Fname});
        }catch (error) {
            console.log("Could NOT creat contact " , error);
            return res.status(404).json({Msg:"Could NOT creat contact "});
        }
    }
}