require('dotenv').config();
const express = require('express');
//const port = process.env.PORT || 6200;
const bodyparser = require('body-parser');
const path = require('path');
const vidStream = require('./vidStream');
const mongoConn = require('./mongo_db/mongo_conn');
const mongoose = require('mongoose');
const app = express();


const PORT = process.env.PORT || 8080;
mongoConn();
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

        //console.log("Server is running at port " + port);
        mongoose.connection.once('open', () => {
            console.log('Connected to MongoDB');
            app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        })
    
        


// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/stream.html");
// });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

// app.get('/html', (req, res) => {
//     const filePath = path.join(__dirname, '/index.html');
//     res.sendFile(filePath);
// });

// app.post("/", (req, res) => {
//     const { name } = req.body;
//     res.send('Welcome ' + name);
// });
// app.get('/video', require('./vidStream'));
app.use("/api", require('./mongo_db/routes'));