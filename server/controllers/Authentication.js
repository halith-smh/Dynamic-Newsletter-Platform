const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PostModel = require("../models/Post");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let emailVal = await User.findOne({ email });
    if (emailVal) return res.status(400).send("Email already registered");

    const hash = await bcrypt.hash(password, parseInt(process.env.SALT));
    const user = await User.create({ name, email, password: hash });
    res.status(200).json({ status: "OK", data: user });
  } catch (error) {
    res.status(403).json({ status: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const key = process.env.JWT_TOKEN;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const pswrd = await bcrypt.compare(password, user.password);
      if (pswrd) {
        const token = jwt.sign({ id : user._id, email: user.email, role: user.role, department: user.
          department }, key, {
          expiresIn: "1d",
        });

        const cookieOptions = {
          sameSite: 'None', // Change 'Lax' to 'None' since your frontend and backend are on different origins
 // Set to true since your backend is running over HTTPS
          httpOnly : false
        };
        
        res.status(200).cookie("token", token, cookieOptions).send("Login Successful");
      } else {
        res.status(500).send("The Password is incorrect");
      }
    } else {
      res.status(500).send("Email not Existed");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const loginVerify = async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send("Unauthorized: Token not provided");
  }

  try {
    const d_token = jwt.verify(token, process.env.JWT_TOKEN);
    if (d_token){
      const posts = await PostModel.find({isPublished: true}, "date thumbnail updatedAt comments").sort({date: -1}).limit(6);
      if(posts){
        return  res.status(200).send({posts});
      }
      res.status(200).send("Token is valid");
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Invalid Token");
  }
};

module.exports = { register, login, loginVerify };
