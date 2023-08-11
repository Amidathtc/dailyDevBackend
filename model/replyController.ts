import mongoose from "mongoose";

interface iReply {
  content?: string;
  user?: {};
  comment?: {};
  postiveVote?: Array<string>;
  userID: string;
}
interface iReplyData extends iReply, mongoose.Document {}

const replyModel = new mongoose.Schema<iReply>(
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
    comment: 
      {
        type: mongoose.Types.ObjectId,
        ref: "comments",
      },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iReplyData>("replies", replyModel);
