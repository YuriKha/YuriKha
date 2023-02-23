const router=require('express').Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination:'./uploads', // איפה לשמור את הקובץ כל סוגי הקבצים נשמרים פה
    filename:(req,file,callback)=>{
        let fileName = ''; // משתנה זה יכיל בסוף הפונקציה את השם של הקובץ שהמשתמש העלה לאתר
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
        // בעזרת הלולאה הבא אנחנו נגריל 10 פעמים תו רנדומלי מהמתשנה למעלה
        for (let i = 0; i < 10; i++) 
        {
            // ככה נוודא שיש לנו שם ייחודי לקובץ של המשתמש
            fileName += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        // נחלץ את סיומת הקובץ של המתשמש לדוגמא .pdf
        let fileEnd=file.originalname.split('.').pop();
        // נשרשר את הסיומת לשם שייצרנו ככה המערכת תדע מאיזה סוג הקובץ
        callback(null,fileName+"."+fileEnd)
    }
});

const uploadFile=multer({
    storage:storage
});

//-------------------------------------------------------

const {
    Contact      // פונקציית לשליחת בקשה 
}=require('../controller/contact'); // נתיב בו נמצאת הפונקציה שלי

//------- ניתוב לשליחת בקשה ------- POST
// במידה ובניתוב יש /contact
// אני מפעיל את הפונקציה Contact                                            פעולת POST
router.post('',uploadFile.single("SVfile"),Contact); // על מנת להפעיל פונקציה זו יש לשלוח בכתובת --->  http://localhost:3001/contact
//----------------------------------

//----------------------ייצא-----------------------------
module.exports=router; // לייצא החוצה