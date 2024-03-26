const PostModel = require("../models/Post");
const UserModel = require("../models/User");

const getNewsletter = async (req, res) => {
  const dateStr = req.params.id; // Assuming the URL parameter is in the format "24-03-2024"
  const desiredTime = "00:00:00"; // Replace with your desired time
  const desiredTimezone = "+00:00"; // Replace with your desired timezone offset

  const [day, month, year] = dateStr.split("-").map(Number);

  const convertedDate = new Date(
    Date.UTC(year, month - 1, day, ...desiredTime.split(":").map(Number))
  );

  const timezoneOffsetMinutes =
    parseInt(desiredTimezone.split(":")[0]) * 60 +
    parseInt(desiredTimezone.split(":")[1]);
  convertedDate.setMinutes(convertedDate.getMinutes() - timezoneOffsetMinutes);

  const startOfDay = new Date(convertedDate); // Copy convertedDate to avoid modifying it
  startOfDay.setUTCHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

  const endOfDay = new Date(startOfDay); // Copy startOfDay to avoid modifying it
  endOfDay.setUTCDate(endOfDay.getUTCDate() + 1); // Set to the next day
  endOfDay.setMilliseconds(endOfDay.getMilliseconds() - 1); // Set milliseconds to 999 to get the end of the day

  const query = {
    date: {
      $gte: startOfDay.toISOString(),
      $lte: endOfDay.toISOString(),
    },
    isPublished: true,
  };

  try {
    // Query the database for documents with the exact date
    const data = await PostModel.find(query);
    if (data.length === 0) {
      return res.status(404).send("No content found for the given date");
    }

    res.status(200).send({ data });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).send(error);
  }
};

const checkIfUserLiked = async (req, res) => {
  const postId = req.params.id;
  const email = req.query.email;

  const mainId = req.query.mainId;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Find the post
    const post = await PostModel.findById(mainId);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

   const eventIndex = post.events.findIndex(
      (event) => event._id.toString() === postId
    );

    let count = 0;
    if(eventIndex !== -1){
      count = post.events[eventIndex].likes
    }


    

    const likedIndex = user.liked.indexOf(postId);
    if (likedIndex === -1) {
      res.status(200).json({ success: true, liked: false, count });
    } else {
      res.status(200).json({ success: true, liked: true, count });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

const handlePostLike = async (req, res) => {
  const postId = req.params.id;
  const { email, liked, mainId } = req.body;

  try {
    const post = await PostModel.findById(mainId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const eventIndex = post.events.findIndex(
      (event) => event._id.toString() === postId
    );
    if (eventIndex !== -1) {
      if (liked) {
        post.events[eventIndex].likes++;
        user.liked.push(postId);
      } else {
        // Decrement logic for unlike:
        if (post.events[eventIndex].likes > 0) {
          post.events[eventIndex].likes--;
        }

        // Remove postId from user's liked array if unliking
        const index = user.liked.indexOf(postId);
        if (index !== -1) {
          user.liked.splice(index, 1);
        }
      }

      // Save the updated post and user
      await post.save();
      await user.save();

      // Optionally, you can return more detailed information in the response
      return res
        .status(200)
        .json({
          success: true,
          message: "Like status updated successfully",
          post,
          user,
        });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Event not found within the post" });
    }
  } catch (error) {
    console.error("Error handling post like:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { getNewsletter, checkIfUserLiked, handlePostLike };
