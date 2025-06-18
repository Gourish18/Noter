import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import dotenv from "dotenv";
import validator from "validator"; 
import axios from "axios";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const validateEmailWithMailboxLayer = async (email) => {
  try {
    const apiKey = process.env.MAILBOXLAYER_API_KEY;
    const response = await axios.get(`http://apilayer.net/api/check`, {
      params: {
        access_key: apiKey,
        email,
        smtp: 1,
        format: 1
      }
    });

    return response.data;
  } catch (err) {
    console.error("MailboxLayer Error:", err.message);
    return null;
  }
};
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Basic field check
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

   
    const emailValidation = await validateEmailWithMailboxLayer(email);

    if (!emailValidation || !emailValidation.smtp_check || !emailValidation.format_valid) {
      return res.status(400).json({ message: "Invalid or unreachable email address" });
    }
     const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "1d"
    });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
    
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// export const register = async (req, res) => {
//   const { email, password, name } = req.body;
//   try {
//     if (!email || !password || !name) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     if (!validator.isEmail(email)) {
//       return res.status(400).json({ message: "Invalid email format" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);
//     const newUser = new User({
//       email,
//       password: hashedPassword,
//       name,
//     });

//     await newUser.save();

//     const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "1d" });

//     res.status(201).json({
//       token,
//       user: {
//         id: newUser._id,
//         email: newUser.email,
//         name: newUser.name,
//       },
//     });
//   } catch (error) {
//     console.log("Error in register", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };




export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.log("Error in login", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
