const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser')

app = express();
app.use(express.json())
app.use(cors({
    origin :["http://localhost:3000"],
    method : ["GET","POST","DELETE","PUT"],
    credentials: true,
}))
app.use(bodyParser.urlencoded({ extended:true}))
//db
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "JinTimesheet",
  });

app.post("/entry",(req,res)=>{
    const id = req.body.id
    db.query("INSERT INTO BAU (id) VALUES(?)",[id],(err,result)=>{
        if(err) console.log(err)
        else console.log("Entry sucessfull")
    })
})


//port
  app.listen(4000,()=>{
    console.log("Jin server running on port : 4000")
})