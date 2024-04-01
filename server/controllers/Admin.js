const PostModel = require("../models/Post");
const UserModel = require("../models/User");

const dashboard = async (req, res) => {
  try {
    const p_count = await PostModel.find({
      isPublished: true,
    }).countDocuments();
    const e_count = await UserModel.find({ role: "editor" }).countDocuments();
    //pending post
    const pen_count = await PostModel.find({
      isPublished: false,
    }).countDocuments();
    const s_count = await UserModel.find({ role: "student" }).countDocuments();

    const today = new Date();

    // Set hours, minutes, seconds, and milliseconds to 0 to compare only dates
    today.setHours(0, 0, 0, 0);

    // Create a new Date object to represent the end of the day
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999); // Set to end of the day

    const query = {
      date: {
        $gte: today,
        $lte: endOfDay, // Search within the current day
      },
      isPublished: false,
    };

    const p_data = await PostModel.findOne(query);
    const data = { count: { p_count, pen_count, s_count, e_count }, p_data };

    res.status(200).json(data);
  } catch (error) {
    res.status(401).send(error);
  }
};

const publishPost = async (req, res) => {
  const { _id, events, thumbnail } = req.body;

  try {
    const post = await PostModel.findOne({ _id });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.events = events;
    post.thumbnail = thumbnail;
    post.isPublished = true;

    await post.save();

    return res
      .status(200)
      .json({ message: "Post published successfully", post });
  } catch (error) {
    console.error("Error publishing post:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const tablePosts = async (req, res) => {
  try {
    const data = await PostModel.find().sort({ date: -1 });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
  // res.status(200).send("ok")
};

module.exports = { dashboard, publishPost, tablePosts };
