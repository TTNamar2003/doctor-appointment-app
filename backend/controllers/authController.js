import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "hello123";

// function for jwt token creation
const createToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "2d" });
};

// function to validate input user
const validateInput = ({ name, email, password, phone_number }, type) => {
  const errors = [];

  // name validation (only letters, 2-50 chars)
  if (type === "signup" && (!name || !/^[A-Za-z\s]{2,50}$/.test(name))) {
    errors.push("Invalid name. Only letters allowed (2-50 chars).");
  }

  // email validation
  if (
    !email ||
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
  ) {
    errors.push("Invalid email format.");
  }

  // password validation (min 6 chars, at least 1 number & 1 special char)
  if (
    type === "signup" &&
    (!password ||
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/.test(password))
  ) {
    errors.push(
      "Password must be at least 6 characters long and include a number & special character."
    );
  }

  // phone number validation (10-digit number)
  if (type === "signup" && (!phone_number || !/^\d{10}$/.test(phone_number))) {
    errors.push("Invalid phone number. Must be a 10-digit number.");
  }

  return errors;
};

// signup Controller
export const signup = async (req, res) => {
  try {
    const { name, email, password, phone_number, role } = req.body;

    // validate input
    const errors = validateInput(req.body, "signup");
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation error", errors });
    }

    // check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      name,
      email,
      password_hashed: hashedPassword,
      phone_number,
      role: role || "user",
    });

    const savedUser = await newUser.save();
    if (!savedUser) {
      return res.status(500).json({ message: "User not saved" });
    }

    // generate JWT Token
    const token = createToken({
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
    });

    // set token in HTTP cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate input
    const errors = validateInput(req.body, "login");
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation error", errors });
    }

    // find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // compare passwords
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password_hashed
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // generate JWT token
    const token = createToken({
      email: user.email,
      role: user.role,
      name: user.name,
    });

    // set token in HTTP cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Secure in production
      sameSite: "none",
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// logout controller
export const logout = (req, res) => {
  // clear JWT cookie
  res.cookie("jwt", "", {
    maxAge: 1,
    httpOnly: true,
  });

  res.status(200).json({ message: "Logged out successfully" });
};
