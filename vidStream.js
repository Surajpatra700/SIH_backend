const express = require('express');
const app = express();
const fs = require('fs');
const linkModel = require('./mongo_db/model');



// const getVideo = async (req, res) => {
//     //retrieving link from mongoDB 🤣
//     try {
//         const vidDB = await linkModel.find();
//         if(!vidDB) res.status(400).json({"message": "No links found"});
//         res.json(vidDB);
//     } catch (error) {
//         console.error(error);
//     }
// }

// const postVideo = async (req, res) => {
//     //storing the path to mongoDB
//     try {
//         const result = await linkModel.create({
//             videoPath
//         })
//         res.status(201).json(result);
//     } catch (error) {
//         console.error(error);
//     }
// }

const videoStream = async (req, res) => {

    // Ensure there is a range given for the video
    const range = req.headers.range; 
    //TO TEST I'M SETTING THE RANGE SIZE
    // const range = 'bytes=0-1048575'
    if (!range) {
      res.status(400).send("Requires Range header");
    }
  
    // get video stats (about 61MB)
    const videoPath = "jiraVideo.mp4";
    const videoSize = fs.statSync("jiraVideo.mp4").size;

    //retrieving link from mongoDB 🤣
    // try {
    //     const vidDB = await linkModel.find();
    //     if(!vidDB) res.status(400).json({"message": "No links found"});
    //     res.json(vidDB);
    // } catch (error) {
    //     console.error(error);
    // }
    // try {
    //     const result = await linkModel.create({
    //         videoPath
    //     })
    //     res.status(201).json(result);
    // } catch (error) {
    //     console.error(error);
    // }
    // await postVideo();
    // await getVideo();
    
  
    // Parse Range
    // Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  
    // Create headers
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
  
    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);
  
    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });
  
    // Stream the video chunk to the client
    videoStream.pipe(res);
  };

  module.exports = videoStream