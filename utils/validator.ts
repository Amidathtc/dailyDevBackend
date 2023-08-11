import {check} from "express-validator"

export const validator={
    registerValidator:[
        check("name").withMessage("pass in your name").isLength({min:8}),

        check("email").trim().toLowerCase().isEmail().withMessage("enter your email"),

        check("password").isLength({min:10}).matches("[A-Za-z0-9 ., '!7]+$/").withMessage("password doesnt match")
       ],

      signInValidator:[
        check("email").isEmail().toLowerCase().normalizeEmail().withMessage("invalid message"),

        check("password").isLength({min:8}).withMessage("enter your email"),
        
       ]
}

