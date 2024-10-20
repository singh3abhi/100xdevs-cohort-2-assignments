const { Router } = require("express");
const router = Router();
const { User, Course } = require("../db/index");
const userMiddleware = require("../middleware/user");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic

  try {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await User.findOne({
      username,
    });

    if (existingUser) {
      return res.status(403).json({
        message: "User already exists",
      });
    }

    await User.create({
      username,
      password,
    });

    res.status(200).json({
      message: "User created successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(501).json({
      message: "Oops something went wrong, Please try again later",
    });
  }
});

router.post("/signin", (req, res) => {
  // Implement admin signup logic
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic

  try {
    const courses = await Course.findOne({});

    res.status(200).json({
      courses,
    });
  } catch (e) {
    console.log(e);
    res.status(501).json({
      message: "Oops something went wrong, Please try again later",
    });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic

  try {
    const username = req.username;
    const courseId = req.params.courseId;

    await User.updateOne(
      { username },
      {
        $push: {
          purchasedCourses: new mongoose.Types.ObjectId(courseId),
        },
      }
    );

    res.status(200).json({
      message: "Purchase Complete",
    });
  } catch (e) {
    console.log(e);
    res.status(501).json({
      message: "Oops something went wrong, Please try again later",
    });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic

  try {
    const username = req.username;
    const user = await User.findOne({
      username,
    });

    const purchasedCourses = await Course.find({
      _id: {
        $in: user.purchasedCourses,
      },
    });

    res.status(200).json({
      purchasedCourses,
    });
  } catch (e) {
    res.status(501).json({
      message: "Oops something went wrong, Please try again later",
    });
  }
});

module.exports = router;
