const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")
const studentController = require("../controllers/studentController")
const { midA1, midA2 } = require("../middlewares/auth")

// <-------------------------USER API----------------------------->
router.post("/register", userController.createUser)
router.post("/login", userController.login)
router.post("/logout", userController.logout)

// <-------------------------Student API----------------------------->
router.post("/student", midA1, studentController.createStudent)
router.get("/student", midA1, studentController.getStudent)
router.put("/student/:studentId", midA1, midA2, studentController.updateStudent)
router.delete("/student/:studentId", midA1, midA2, studentController.deleteStudent)


router.all('/*', function (req, res) {
    res.status(400).send({ status: false, message: "Invalid URL" })
})

module.exports = router;