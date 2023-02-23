const mongoose=require('mongoose');

mongoose.pluralize(null); // מונע התערבות הספריה בשמות הטבלאות שלי

//-------------------------------------------------

const UserSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,   
    Fname:String,
    Lname:String,
    Email:String,
    Phone:String,
    JobNumber:Number,
    Content:String,
});

//----------------------ייצא------------------------

module.exports=mongoose.model("contact",UserSchema); 