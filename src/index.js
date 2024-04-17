import dotenv from "dotenv"
    /* Does this experimental bit for consistency in code, 
    instead of require for dotenv we can use import dotenv. Ref - Line 8 package.json */

import connectDB from "./db/connectDB.js";

dotenv.config({
    path: './env'
})

connectDB()


// import express from "express"

// const app = express()

// //Effy
// ;( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", ()=>{console.log("Error :",error);
//         throw error
//     })
//     app.listen(process.env.PORT, () => {
//         console.log(`Application is running on port ${process.env.PORT}`);
//     })

//     } catch (error) {
//         console.log("Error while connecting to DB ",error);
//         throw error
//     }
// })()