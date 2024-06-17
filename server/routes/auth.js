const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const User = require('../models/User');
const Admin = require("../models/Admin");
const {auth,admin} = require("../middleware/auth");
const Log = require("../models/Log");

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  const { name, username, email, phone, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const isAdmin = email.endsWith("@numetry.com");

    const newUser = new Admin({
      name,
      username,
      email,
      phone,
      password: hashedPassword,
      role: isAdmin ? "admin" : "user",
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: isAdmin
        ? "Admin Registered successful"
        : "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await Admin.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });

    const role = user.role;

    const token = jwt.sign(
      { id: user._id, role: role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Convert UTC login time to IST
    const istLoginTime = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);

    // Log the login time
    if (role === "user") {
      const log = new Log({ userId: user._id, loginTime: istLoginTime });
      await log.save();
    }

    res.json({
      success: true,
      token,
      id: user._id,
      role: role,
      message: `${role.toUpperCase()} Login Successful `,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Logout Route
router.post("/logout", auth, async (req, res) => {
  try {
    const log = await Log.findOne({ userId: req.user._id }).sort({
      loginTime: -1,
    });
    if (log && !log.logoutTime) {
      log.logoutTime = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
      await log.save();
    }
    res.json({ success: true, message: "User logged out" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Route to get all users with the role "user"
// router.get("/users", auth, async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Access denied" });

//     }

//     // const users = await Admin.find({ role: "user" });
//     const users = await Admin.find({ role: "user" }).lean();

//     // for only logging login time

//     // const userLogins = await Promise.all(
//     //   users.map(async user => {
//     //     const lastLogin = await Log.findOne({ userId: user._id }).sort({ loginTime: -1 });
//     //     return {
//     //       ...user.toObject(),
//     //       lastLoginTime: lastLogin ? lastLogin.loginTime : null,
//     //     };
//     //   })
//     // );

//     // for both logout and login time
//     for (let user of users) {
//       const lastLog = await Log.findOne({ userId: user._id }).sort({ loginTime: -1});
//       if (lastLog) {
//         user.lastLoginTime = lastLog.loginTime;
//         user.lastLogoutTime = lastLog.logoutTime;
//       } else {
//         user.lastLoginTime = null;
//         user.lastLogoutTime = null;
//       }
//     }
//     res.json({ success: true, users  });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// Route to get all users with their login and logout times for the day
// router.get("/users", auth, async (req, res) => {
//   try {
//     // if (req.user.role !== "admin") {
//     //   return res.status(403).json({ success: false, message: "Access denied" });
//     // }

//     const users = await Admin.find({ role: "user" }).lean();
//     const startOfDay = new Date();
//     startOfDay.setHours(0, 0, 0, 0);
//     const endOfDay = new Date();
//     endOfDay.setHours(23, 59, 59, 999);

//     for (let user of users) {
//       const logs = await Log.find({ userId: user._id, loginTime: { $gte: startOfDay, $lte: endOfDay } }).sort({ loginTime: 1 });
//       user.logs = logs;
//     }
//     res.json({ success: true, users });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// Route to get all users with all their login and logout times

router.get("/users", auth, async (req, res) => {
  
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const users = await Admin.find({ role: "user" }).lean();

    for (let user of users) {
      const logs = await Log.find({ userId: user._id }).sort({ loginTime: 1 });
      user.logs = logs.map((log) => ({
        loginTime: log.loginTime,
        logoutTime: log.logoutTime,
      }));
    }

    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Route to get user data
router.get("/user", auth, async (req, res) => {
  try {
    const user = await Admin.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
