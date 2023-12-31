import mongoose from "mongoose";

interface iPost {
  title?: string;
  content?: string;
  image?: string;
  imageID?: string;
  user?: {};
  comment?: {}[];
  vote?: {}[];
  tags?: Array<string>;
  userID: string;
}
interface iPostData extends iPost, mongoose.Document {}

const postModel = new mongoose.Schema<iPost>(
  {
    title: {
      type: String,
    },
    userID: {
      type: String,
    },
    content: {
      type: String,
    },

    image: {
      type: String,
    },
    imageID: {
      type: String,
    },
    tags: {
      type: Array<String>,
    },
    comment: [
      {
        type: mongoose.Types.ObjectId,
        ref: "comments",
      },
    ],

    vote: [
      {
        type: mongoose.Types.ObjectId,
        ref: "likes",
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iPostData>("posts", postModel);
