if(process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
//const { success, error } = require('consola');
// const User = require('./models/User');
// const jwt = require("jsonwebtoken");
const passport = require('passport');
const app = express();

app.use(cors())
app.use(express.json())
app.use(passport.initialize())
require("./middlewares/passport/passport")(passport);

app.use("/api", require("./routes/users"));


mongoose.connect(process.env.DB)
.then(()=>{console.log("DB connected")})
.catch(()=> {console.log("DB connection unsucessful")})

port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`server is listening to ${port}`);
})