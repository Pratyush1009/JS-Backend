import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//We prefer app.use() when we need to configure some settings or middleware

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
//By defining extended property we can pass object inside object, i.e., we can pass nested objects

app.use(express.static("public"))
//Use static to store the files and folders like pdf images in the local public asset

app.use(cookieParser())

export default app