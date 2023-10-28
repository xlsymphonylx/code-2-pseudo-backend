const express = require("express");
const router = express.Router();
const translationController = require("../controller/translationController");

// Define routes for translationController

router.post("/translateJS", translationController.translateJS);
router.post("/translatePseudo", translationController.translatePseudo);
router.post("/saveCourse", translationController.saveCourse);
router.put("/editCourse/:courseId", translationController.editCourse);
router.get("/getAllCourses", translationController.getAllCourses);
router.get("/getOfficialCourses", translationController.getOfficialCourses);
router.get(
  "/getNonOfficialCourses",
  translationController.getNonOfficialCourses
);
router.delete("/deleteCourse/:courseId", translationController.deleteCourse);
router.put(
  "/changeSubscriptionModel/:newSubscriptionModel",
  translationController.changeSubscriptionModel
);

module.exports = router;
