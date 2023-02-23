//-------------------ספריית express-------------------------- 
const express=require('express'); // חיבור לסיפריית אקספרס
const app=express(); // יצירת האובייקט מסוג הספריה 
//-----------------------------------------------------------

//------------------ ספריית morgan -------------------------
const morgan=require('morgan');
app.use(morgan('dev'));
//-----------------------------------------------------------

//-------------- חיבור לתקיית dot.env ------------------
require('dotenv').config();
//-------------------------------------------------------

//-------------- ייצרנו שכבה לסשן שלנו --------------------
const session = require('./api/middleware/session');
session(app)
//-------------------------------------------------------

//---------- חיבור לספריית מונגוס --------------------------
const mongoose=require('mongoose');
//-----------------------------------------------------------

// -----------  ניתובים  -----------------------------------
//--- הרשמה ---
const RegisterRouter=require('./api/route/register'); //   /register
//--- התחברות ---
const LoginRouter=require('./api/route/login'); //   /login
//--- תוכן למשתמשים מחוברים ---
const PrivateRouter=require('./api/route/private'); //   /private
//--- לשליחת בקשה ---
const ContactRouter=require('./api/route/contact') //  /contact
//-----------------------------------------------------------

//----------- המרת נתונים גולמיים לג'ייסון או URL ENCODED  ----------
// הוספת שכבה שממירה את הנתונים הגולמיים שמתקבלים לפורמט json
app.use(express.json());
//-----------------------------------------------------------
// הוספת שכבה שממירה את הנתונים הגולמיים שמתקבלים לפורמט urlencoded
app.use(express.urlencoded({
    extended:false
}));

//-----------------------------------------------------------
const path = require('path');
//---------------- דפים סטאטיים ------------------------
app.use(express.static('public'));
//------------- דפים לא סטאטיים לדף הפרטי שייצרתי------------------------
app.set('views',path.join(__dirname,'view'));
app.set('view engine','hbs');
//-------------------------------------------------------

//----- חיבור לבסיס נתונים של מונגו -----------------------
mongoose.set('strictQuery', true);  // <- הסיבה שהוספתי את זה כי 
// הייתה הודעה שלא ממש הפריע להריץ אבל הציקה לי בעין
// ההודעה :
// (node:6420) [MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. 
// Use `mongoose.set('strictQuery', false);` 
// if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
const uri = process.env.MONGODB_CONNECTION_STRING;
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology: true}).then(()=>{
    console.log('you connected to the Database');
});
//-----------------------------------------------------------

//--------------- כל נקודות הקצה הקיימות באפליקציה ---------

//---- נתיב הרשמה ----  /register
app.use('/register',RegisterRouter); 

//---- נתיב התחברות ----  /login
app.use('/login',LoginRouter); 

//---- נתיב למשתמשים מחוברים ----  /private
app.use('/private',PrivateRouter); 

//--- נתיב לשליחת בקשה -פרטיים אישיים קורות חיים וכו ---  /contact
app.use('/contact',ContactRouter); 

// נתיב שלא נתפס למעלה יתפס פה
app.all('*',(req,res)=>{ 
    console.log("cheack the URL i do not know the route"); // נדפיס אצלנו בקונסול על מנת שנדע שקיבלנו נתיב  שלא קיים לשם מעקב
    res.status(404).json({Msg:"cheack the URL i do not know the route"})  // מודיע למשתמש שאין לנו ניתוב כזה
  });
//-----------------------------------------------------------

//----------------------ייצא----------------------------
module.exports=app; // לייצא החוצה