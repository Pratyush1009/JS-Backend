import dotenv from "dotenv"
    /* Does this experimental bit for consistency in code, 
    instead of require for dotenv we can use import dotenv. Ref - Line 8 package.json */

import connectDB from "./db/connectDB.js";
import app from "./app.js";

dotenv.config({
    path: './env'
})


connectDB()
.then(()=>{
    app.on("error", (error) => {
        console.log("ERROR: ",error);
        throw error
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Application is running on port ${process.env.PORT}`);
    })
})
.catch((err)=>{console.log("Mongo DB connection failed !!! ",err);})