import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import RegisterResponseDto from "../dtos/registerResponse.dto.js";
import jwt from "jsonwebtoken";

var router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkeymysecret";

/* POST registers new users */
router.post("/register", async function (req, res) {
  const { firstName, lastName, email, password } = req.body;

  var hashedPassword = await bcrypt.hashSync(password, 10);

  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      hashedPassword,
    });

    const user = await newUser.save();
    var resdto = new RegisterResponseDto(user);
    res.status(201).json("User registered successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) res.status(404).json({ msg: "User not found" });
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) res.status(400).json({ msg: "Invalid credentials" });

    const payload = {
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
