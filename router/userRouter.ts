import express, { Router } from "express"
import { getOneUser, getUsers, registerUser, signInUser } from "../controller/userController"
// import { validator } from "../utils/validator"
import { upload } from "../utils/multer"
// import { check } from "express-validator"

const router = express.Router()

router.route("/register").post(
upload,registerUser)

router.route("/sign-in").post(
    // [
    // check("email").isEmail().toLowerCase().normalizeEmail().withMessage("invalid message"),

    // check("password").isLength({min:8}).withMessage("enter your email"),],
    signInUser)
router.route("/get-all").get(getUsers)
router.route("/get-one").get(getOneUser)

export default router