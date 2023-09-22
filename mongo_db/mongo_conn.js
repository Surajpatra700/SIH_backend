require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("MongoDB Connected to server")).catch((error)=> console.log('Error! ',error));