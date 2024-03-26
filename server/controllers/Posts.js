const Post = require("../models/Post");

const addPost = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 to compare only dates

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999); // Set to end of the day

    const post = await Post.findOne({
      date: { $gte: today, $lte: endOfDay },
    });
    
    if (post) {
      const eventData = req.body.events;

      // Handle file uploads and update img value in each event
      const updatedEvents = await Promise.all(
        eventData.map(async (event) => {
          if (req.files && req.files.length > 0) {
            const file = req.files.shift(); // Get the first uploaded file
            event.img = file.path; // Set the img value to the file path
          }
          return event;
        })
      );

      // Push updated events to the post
      updatedEvents.forEach((event) => {
        post.events.push(event);
      });

      await post.save();

      res.status(200).json({ post });
    } else {
      // New post logic
      const eventData = req.body.events;

      // Handle file uploads and update img value in each event
      const updatedEvents = await Promise.all(
        eventData.map(async (event) => {
          if (req.files && req.files.length > 0) {
            const file = req.files.shift(); // Get the first uploaded file
            event.img = file.path; // Set the img value to the file path
          }
          return event;
        })
      );

      // Create new post with updated events
      const newPost = await Post.create({
        events: updatedEvents,
      });

      res.status(200).json({ msg: "ok", data: newPost });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addPost };
