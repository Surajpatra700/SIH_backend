const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
    link1: String,
    link2: String,
    link3: String,
    link4: String,
    link5: String,
    link6: String,
    link7: String,
    link8: String,
    link9: String,
    link10: String,
});

module.exports = mongoose.model("Text_To_Video", ModelSchema);