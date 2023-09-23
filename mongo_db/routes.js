const express = require('express');
const fs = require('fs');
const Video = require('./model'); // Adjust the path as needed

const router = express.Router();

router.get('/video', async (req, res) => {
  // Ensure there is a range given for the video
  const range = req.headers.range || "bytes=0-999";
  if (!range) {
    return res.status(400).send('Requires Range header');
  }

  // Get video stats (about 61MB)
  const videoPath = 'jiraVideo.mp4'; // Adjust the path to your video
  const videoSize = fs.statSync(videoPath).size;

  // Parse Range
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ''));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'video/mp4',
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // Create a video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
});

router.post('/video', async (req, res) => {
  // Assuming you have videoPath and videoSize available
  const { videoPath, videoSize } = req.body;

  if (!videoPath || !videoSize) {
    return res.status(400).json({ error: 'Both videoPath and videoSize are required.' });
  }

  try {
    const video = new Video({
      videoPath,
      videoSize,
    });

    const savedVideo = await video.save();

    return res.status(201).json(savedVideo);
  } catch (error) {
    console.error('Error saving video:', error);
    return res.status(500).json({ error: 'An error occurred while saving the video.' });
  }
});

router.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    return res.status(200).json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return res.status(500).json({ error: 'An error occurred while fetching videos.' });
  }
});

module.exports = router;
