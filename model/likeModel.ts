import express from "express"
import mongoose from "mongoose";

interface iLike {
userID?:string
like?:boolean

} 

interface iLikeData extends iLike, mongoose.Document{}


const likeModel = new mongoose.Schema({
userID:{
    type:String
},
like:{
    type:Boolean,
    default:false
}
})

export default mongoose.model<iLikeData>("likes", likeModel)