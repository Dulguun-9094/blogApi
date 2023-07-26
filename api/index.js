const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/Users");
const postRoute = require("./routes/Posts");
const categoriesRoute = require("./routes/Categories");

app.use(express.json());

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
    
})
.then(()=>{
    console.log("DB connected");
})
.catch(()=>{
    console.log(err);
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoriesRoute);

app.listen(PORT, ()=>{
    console.log(`server listen in ${PORT} port`)
})