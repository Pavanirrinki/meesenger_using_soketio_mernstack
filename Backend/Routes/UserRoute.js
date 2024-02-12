const express = require("express")
const router = express()
const usermodel = require("../Models/Usermodel.js")
const jwt = require("jsonwebtoken")
router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const existingUser = await usermodel.findOne({ email });
  
      if (existingUser) {
        return res.status(500).send("Email Already Exists");
      }
  
      if (!username || !email || !password) {
        return res.status(401).send("Please fill all fields");
      }
  
      const user = await new usermodel({ username, email, password });
      await user.save();
      return res.status(201).json("user created");
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  });
  

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const existingUser = await usermodel.findOne({ email });
      if (existingUser) {
        if (existingUser.password == password) {
          let payload = {
            user: {
              id: existingUser.id,
            },
          };
  
          jwt.sign(payload, "jwtpassword", (error, token) => {
            if (error) throw error;
            const userWithoutPassword = { ...existingUser._doc }; // mongodb data to plain javascript object can be converted 
            delete userWithoutPassword.password;
  
            return res.json({ token, user: userWithoutPassword });
           
           
          });
        } else {
          return res.status(400).send("password wrong");
        }
      } else {
        return res.status(400).send("email wrong");
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router