require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 6200;
const bodyparser = require('body-parser');

const app = express();
// app.use(express.json);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.listen(port, (error)=> {
    if(!error)
        console.log("Server is running at port " + port);
    else
        console.log("Error Occured ",error);
});

app.get("/", (req, res)=>{
    res.send("Home Screen");
});

app.post("/", (req,res)=>{
    const {name} = req.body;
    res.send('Welcome ' + name);
});