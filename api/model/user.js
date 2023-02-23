const mongoose=require('mongoose');

mongoose.pluralize(null); // מונע התערבות הספריה בשמות הטבלאות שלי

//-------------------------------------------------


const UserSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,   
    Fname:String,           
    Lname:String,         
    Email:String,        
    Password:String,    
});

//----------------------ייצא----------------------------

module.exports=mongoose.model("user",UserSchema); 