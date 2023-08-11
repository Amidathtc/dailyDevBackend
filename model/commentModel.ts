import mongoose from "mongoose";

interface iComment {
  content?: string;
  user?: {};
  post?: {};
  reply?: {}[];
  postiveVote?: Array<string>;
  userID: string;
}
interface iCommentData extends iComment, mongoose.Document {}

const commentModel = new mongoose.Schema<iComment>(
  {
    userID: {
      type: String,
    },
    content: {
      type: String,
    },

    postiveVote: {
      type: Array<String>,
    },
    reply: [
      {
        type: mongoose.Types.ObjectId,
        ref: "replies",
      },
    ],

    post: 
      {
        type: mongoose.Types.ObjectId,
        ref: "posts",
      },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iCommentData>("comments", commentModel);
