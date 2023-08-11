import express, { Router } from "express"
import { image} from "../utils/multer"
import { createPost, getAllPost, getUserPost, unVotePost, veiwVotedPost, votePost } from "../controller/postController"

const router = express.Router()

router.route("/:userId/create-post").post(
image,createPost)

router.route("/get-all-post").get(getAllPost)
router.route("/:userId/get-user-post").get(getUserPost)
router.route("/:userId/:postId/vote-post").post(votePost)
router.route("/:userId/:postId/:likeId/unvote-post").post(unVotePost)
router.route("/:postId/unvote-post").get(veiwVotedPost)

export default router