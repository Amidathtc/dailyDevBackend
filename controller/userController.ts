import { Request, Response } from "express";
import { mainError, HTTP } from "../error/mainError";
import cloudinary from "../utils/cloudinary";
import bcrypt from "bcrypt"
import userModel from "../model/userModel";
import { validationResult } from "express-validator";

export const registerUser = async (req : any, res : Response): Promise<Response>=> {
    try {
        const {password, email, name} = req.body;
        // const errors =validationResult(req)

        // if (errors) {
        //     return res.status(HTTP.BAD_REQUEST).json(errors)
        // }

        const salt = await bcrypt .genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        const { secure_url, public_id } = await cloudinary.uploader.upload(
            req.file?.path,
          );
          
          const user = await userModel.create({
            name,
            email,
            password: hashed,
            avatar: secure_url,
            avatarID: public_id,
          });

       return res.status(HTTP.CREATED).json({
        message : "User created",
        data: user,
       })
    } catch (error) {
        new mainError({
            name : "Create Error",
            message :  `This error is as a result of creating user`,
            status: HTTP.BAD_REQUEST,
            success: false
        });

        return res.status(HTTP.BAD_REQUEST).json({
            message: "Error",
        })
    }
}

export const signInUser = async (req :Request, res : Response): Promise<Response>=> {
    try {
    const {password, email } = req.body;
        // const errors= validationResult(req)
        // if (errors) {
        //     return res.status(HTTP.BAD_REQUEST).json(errors)
        // }

          const user = await userModel.findOne({email});
          const checked =await bcrypt.compare(password, user?.password!)
          
          if (checked) {
            return res.status(HTTP.CREATED).json({
                message : "welcome back",
                data: user?._id,
               })
          } else {
            new mainError({
                name : "sign in Error",
                message :  `This error is as a result of signing  user`,
                status: HTTP.BAD_REQUEST,
                success: false
            });
    
            return res.status(HTTP.BAD_REQUEST).json({
                message: "Error"
            })
          }
    
    } catch (error) {
        new mainError({
            name : "Create Error",
            message :  `This error is as a result of creating user`,
            status: HTTP.BAD_REQUEST,
            success: false
        });

        return res.status(HTTP.BAD_REQUEST).json({
            message: "Error"
        })
    }
}

export const getUsers = async (req :any, res : Response): Promise<Response>=> {
    try {
          const user = await userModel.find();
        
       return res.status(HTTP.OK).json({
        message : "User created",
        data: user,
       })
    } catch (error) {
        new mainError({
            name : "get Error",
            message :  `This error is as a result of getting user`,
            status: HTTP.BAD_REQUEST,
            success: false
        });

        return res.status(HTTP.BAD_REQUEST).json({
            message: "Error"
        })
    }
}

export const getOneUser = async (req : any, res : Response): Promise<Response>=> {
    try {

        const {userId}=req.params;
          const user = await userModel.findById(userId);
        
       return res.status(HTTP.OK).json({
        message : "User created",
        data: user,
       })
    } catch (error) {
        new mainError({
            name : "get Error",
            message :  `This error is as a result of getting user`,
            status: HTTP.BAD_REQUEST,
            success: false
        });

        return res.status(HTTP.BAD_REQUEST).json({
            message: "Error"
        })
    }
}

