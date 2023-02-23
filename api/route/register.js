const router=require('express').Router();

//----------------------------------

const {
    Register  // פונקציה להוספת משתמש חדש
}=require('../controller/register'); // נתיב בו נמצאת הפונקציה שלי

//-------- ניתוב להרשמה --------- POST
// במידה ובניתוב יש /register
// אני מפעיל את הפונקציה Register                                            פעולת POST
router.post('',Register); // על מנת להפעיל פונקציה זו יש לשלוח בכתובת --->  http://localhost:3001/register
//----------------------------------

//----------------------ייצא-----------------------------
module.exports=router; // לייצא החוצה