const express = require('express');
const app = express();
const Mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const stdRoutes = require('./routes/stdRoutes');
const adminroutes= require('./routes/adminRoutes');


dotenv.config();

app.use(bodyParser.json());

Mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongodb connected")
})
.catch((error)=>{
    console.log(`An error has been occured ${error}`)
});

app.use('/studentdata',stdRoutes);
app.use('/admin',adminroutes);

app.listen(PORT,()=>{
    console.log(`The server is running in port number ${PORT}`)
});
