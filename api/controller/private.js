
module.exports={
    Private:(req,res)=>{ 
        // בזמן הפעלת הפונקציה
        if(req.session.user){ // אני בודק עם יש לו סשן עם האתר
            res.render('private',{// אם כן
                // מחלץ מהסשן את השם שלו ומעביר למשתנה userName
                userName:req.session.user.userName // המשתנה הזה מעביר לדף הדינאמי שלי ובשדה הזה יופיע השם שלו
            });
       }else{
            // במידה ואין סשן נפנה לאתר שמסביר מה לעשות
            return res.redirect('/noSession.html');
       }
    }
}