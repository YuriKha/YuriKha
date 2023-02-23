require('dotenv').config();

const session = require('express-session');

const MongoStore = require('connect-mongo');

//-------------------------------------------------------------------

module.exports=(app)=>{
    app.use(session({
        // התוכן מוסתר בקובץ .env
        secret:process.env.SECRET_SESSION, // המפתח לסשן
        resave:false,
        saveUninitialized:true,
        cookie:{maxAge:process.env.MAX_AGE_FOR_SESSIO,httpOnly:true}, // אורך הסשן
        store:MongoStore.create({mongoUrl:process.env.MONGODB_CONNECTION_STRING}) // מחרוזת ההתחברות שלי למונגו
    }));
};


