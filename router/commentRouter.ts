import express, { Router } from "express"
import { createComment } from "../controller/commentController"

const router =Router()

router.route("/:userId/:postId/create-comment").post(createComment)
 export default router