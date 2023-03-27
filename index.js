const express = require("express");
const {connection} = require("./config/db");
const app = express();
const cors = require("cors");
const {Authetication}  =require("./middlewares/Authentication.middlewares");
const {postRouter} = require("./routes/post.route");
const {userRouter} = require("./routes/users.route");
require("dotenv").config()

app.use(cors);
app.use(express.json());

app.get("/",(req,res) => {
    res.send("Home Page");
})

app.use("/user",userRouter);
app.use(Authetication);
app.use("/post",postRouter);

app.listen(process.env.port, async() => {
    try{
        await connection;
        console.log("Connected to DB");
    }catch(err){
        console.log("Cannot connect to DB");
        console.log(err);
    }
    console.log(`Server is running at port ${process.env.port}`)
})