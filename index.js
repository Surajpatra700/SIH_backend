require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 6200;
const bodyparser = require('body-parser');
const path = require('path');
const expressFileUpload = require('express-fileupload');
const ffmpeg = require('fluent-ffmpeg');

const app = express();
// app.use(express.json);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(
    expressFileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

ffmpeg.setFfmpegPath("C:/ffmpeg/bin/ffmpeg.exe");

ffmpeg.setFfprobePath("C:/ffmpeg/bin");

ffmpeg.setFlvtoolPath("C:/flvtool");

console.log(ffmpeg);

app.listen(port, (error) => {
    if (!error)
        console.log("Server is running at port " + port);
    else
        console.log("Error Occured ", error);
});

app.get("/", (req, res) => {
    res.send("Home Screen");
});

// app.get('/html', (req, res) => {
//     res.sendFile(__dirname + './index.html')
// });

app.get('/html', (req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    res.sendFile(filePath);
});

app.post('/convert', (req, res) => {
    let to = req.body.to;
    let file = req.files.file;
    console.log(to);
    console.log(file);

    file.mv("tmp/" + file.name, function (err) {
        if (err) return res.sendStatus(500).send(err);
        console.log('File Uploaded Succesfully');
    })
});

// app.post("/", (req, res) => {
//     const { name } = req.body;
//     res.send('Welcome ' + name);
// });