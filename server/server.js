const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const AuthRouter = require("./routes/Auth");
const PostRouter = require("./routes/Posts");
const AdminRouter = require("./routes/Admin");

const PublicRouter = require("./routes/Public");

const { verifyAdmin } = require("./middleware/Admin");
const { verifyUser } = require("./middleware/User");
const { verifyEditor } = require("./middleware/Editor");

const path = require("path");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Public Img access directory
const uploadsDirectory = path.join(__dirname, "uploads");
app.get("/uploads/:date/:filename", (req, res) => {
  const { date, filename } = req.params;
  const imagePath = path.join(uploadsDirectory, date, filename);
  res.sendFile(imagePath);
});

//auth
app.use("/api/auth", AuthRouter);

//post
app.use("/api/posts", verifyEditor, PostRouter);

//admin
app.use("/api/admin/", verifyAdmin, AdminRouter);

//public routes - auth common users routes
app.use("/api/", verifyUser, PublicRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Listen to port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
