const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  videoPath: String,
  videoSize: Number
});

const Video = mongoose.model('VideoLink', videoSchema);

module.exports = Video;
