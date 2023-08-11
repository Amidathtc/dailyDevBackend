import express,{Request,Response} from "express"
import { HTTP, mainError } from "../error/mainError";
import userModel from "../model/userModel";
import postModel from "../model/postModel";
import commentModel from "../model/commentModel";
import mongoose from "mongoose";

export const createComment=async(req:Request,res:Response)=>{
    try {
        const {userId, postId}=req.params
        const {content}=req.body
        const user =await userModel.findById(userId)
        const post =await postModel.findById(postId)

        const comment =await commentModel.create({content})
post?.comment?.push(new mongoose.Types.ObjectId(comment._id))
post?.save()

return res.status(HTTP.CREATED).json({
    message:"comment created",
    data:comment
})


    } catch (error) {
        new mainError({
            name : "Create Error",
            message :  `This error is as a result of creating commnet`,
            status: HTTP.BAD_REQUEST,
            success: false
        });

        return res.status(HTTP.BAD_REQUEST).json({
            message: "Error"
        })
    }
}