const http = require('http'); 
const app=require('./app'); 
require('dotenv').config();// גישה לקובץ על מנת שאוכל להתשמש בתוכן process.env

const server=http.createServer(app);
// המשתנה פורט מקבל את אחד מהפורטים הזמינים שציינתי
const port= process.env.PORT || process.env.BACK_UP_PORT; // הפורטים מוסתרים בקובץ .ENV
// פה אני מאזין לפורט שציינתי במשתנה למעלה
server.listen(port,()=>{ 
    console.log('you started the server')
});



