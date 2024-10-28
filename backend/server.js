const express = require('express');
const mysql =  require('mysql2');
const cors = require('cors');4
const bodyParse = require('body-parser');

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParse.json());

const db=mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'nodereact'
});

db.connect((err)=>{
    if(err) throw err;
    console.log('Connected to nodereact dat3ebase..');
});

//crud operation

app.get('/users',(req,res)=>{
    db.query('Select * from users',(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
});
app.post('/users',(req,res)=>{
    const user=req.body;
    db.query("INSERT INTO users SET ?", user,(err,result)=>{
        if(err) throw err;
        res.json({id:result.insertId,...user});
    })
});

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
});