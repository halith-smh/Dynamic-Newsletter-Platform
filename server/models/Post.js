const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  img: { type: String, required: true },
  likes: { type: Number, default: 0 },
  department: { type: String, required: true },
  editor: { type: String, required: true },
});

// Comment Schema
const CommentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const PostSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: () => {
        const cDate = new Date()
        // cDate.setHours(0, 0, 0, 0);
        return cDate;
      },
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    thumbnail: {
      type: String,
      default: null
    },
    events: [EventSchema],
    comments: [CommentSchema],
  },
  { timestamps: true }
);

const PostModel = mongoose.model("posts", PostSchema);
module.exports = PostModel;
