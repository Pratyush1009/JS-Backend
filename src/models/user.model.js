import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true //To enable searching on any field enable index of that field
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, 
        trim: true
    },
    
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    
    avatar: {
        type: String, // cloudinary URL
        required: true
    },
    
    coverImage: {
        type: String // Cloudinary URL
    },

    
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],

    password: {
        type: String,
        required: [true, "Password is required"]
    },
    
    refreshToken: {
        type: String
    }

},{timestamps: true})


/* The encrytion of password is a complex process and it takes time
    so we make these function async */

userSchema.pre("save", async function (next) {
    /* Introduced if condition because if we update any other field in 
    User then it should not change and encryt the encryted password
    and can directly go to next */

    if(!this.isModified("password"))
        return next();

    // hash function takes what to be encrypted and salt(hash rounds)
    this.password = bcrypt.hash(this.password, 10)
    next() 
})


userSchema.methods.isPasswordCorrect = async function(password) {
   return await bcrypt.compare(password, this.password)
}

//Genarting Access Token
userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


//Generating Refresh Token
userSchema.methods.generateRefreshToken = function() {
    jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)