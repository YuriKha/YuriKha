const user=require('../model/user');

const mongoose=require('mongoose');  

//-------------------------------------------------------------

module.exports={
    Login:async(req,res)=>{
        const Email = req.body.email;
        const Password = req.body.password;
        try{
            const userFound = await user.findOne({Email:Email})
            if (userFound.Password === Password)
            {
                // ניצור סשן ונכניס לתוכו את השם והאימייל של המשתמש
                req.session.user = {userName:userFound.Fname,userEmail:userFound.Email};
                // נפנה את המשתמש לעמוד על מנת לעודד אותו לנסות ולהכנס לאתר עם גישה מוגבלת
                return res.status(200).redirect('/tryPrivate.html');
            }else{
                // סיסמא לא נכונה
                return res.status(404).json({Msg:"The password you entered is incorrect"});
            }
            //---------------- {~.^}
            // במקרה אמיתי הייתי בודק כמה משתמשים נמצאו לי אם האימייל הזה
            // על מנת לוודא שבסיס הנתונים שלי תקין ויש לי אימיילים יחודיים למשתמשים
            // הייתי דואג לעשות הצפנה עוד בזמן ההרשה ולהשוות את ההשים
            // אני לא מזלזל
            // רק מקצר
            //---------------- {~.^}
        }catch (error) {
            console.log("User put wrong email ");
            return res.status(404).json({Msg:"The Email you entered is incorrect"});
        }
    }
}