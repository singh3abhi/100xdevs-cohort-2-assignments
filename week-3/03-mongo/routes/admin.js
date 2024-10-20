const { Router, json } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic

  try {
    const username = req.body.username;
    const password = req.body.password;

    // Check if any admin with same username already exists

    const existingAdmin = await Admin.findOne({
      username: username,
    });

    if (existingAdmin) {
      return res.status(401).json({
        message: "A admin already exists with this username",
      });
    }

    const userAdmin = await Admin.create({
      username: username,
      password: password,
    });

    res.status(200).json({
      message: "Admin created successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(501).json({
      message: "Oops something went wrong, Please try again later",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  // Should use zod but skipping it in assignment as we already done earlier

  try {
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse = await Course.create({
      title,
      price,
      description,
      imageLink,
    });

    return res.status(200).json({
      message: "Course created successfully",
      courseId: newCourse.id,
    });
  } catch (e) {
    console.log(e);
    res.status(501).json({
      message: "Oops something went wrong, Please try again later",
    });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic

  try {
    const courses = await Course.find({}, { _id: 0, __v: 0 });

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

module.exports = router;
