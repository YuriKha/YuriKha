const user=require('../model/user');//גישה למודל שלי 

const mongoose=require('mongoose');  // גישה לספריה שעובדת עם מונגו

require('dotenv').config();// גישה לקובץ .env

//-------------------------------------------------------------

module.exports={
    Register:async(req,res)=>{
        const Fname = req.body.firstName;
        const Lname = req.body.lastName;
        const Email = req.body.email;
        const Password = req.body.password;
        try{
            const saveUser = await new user({
                _id:new mongoose.Types.ObjectId(),
                Fname,
                Lname,
                Email,
                Password
            });  
            await saveUser.save();  
           
            console.log("New user just registered " , saveUser);
            // ---- שליחת מייל למשתמש ולאדמין ----
            require('./emailTemplate/NewUserEmail').SendEmail(Email,req.body,req.body);
            require('./emailTemplate/NotifyAdminUser').SendEmail(process.env.PROJECT_EMAIL,req.body,req.body);

            return res.status(200).redirect('/login.html'); // לאחר הרשמה מוצלחת נפנה לעמוד התחברות

            //---------------- {~.^}
            // במקרה אמיתי הייתי בודק אם כבר יש לי משתמש כזה
            // הייתי מוודא שלא קיים לי אימייל זהה במערכת שלי
            // הייתי דואג להצפנה וכו' אני כותב משהוא בקטנה
            //---------------- {~.^}
        }catch (error) {
            console.log("Could NOT save the new user " , error);
            return res.status(404).json({Msg:"Could NOT save the new user "});
        }
            
    }
}