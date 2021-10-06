const express = require("express");

const router = express.Router();

const StaffController = require("../controllers/StaffController");
const AuthMiddleware = require("../middleware/Auth");

router.post("/new-staff", StaffController.createNewStaff);
router.get("/register", StaffController.createStaffView)
router.post("/login", StaffController.login)
router.get("/create-staff", AuthMiddleware.redirectLogin, StaffController.newStaff)
router.get("/home", AuthMiddleware.redirectLogin, StaffController.home)
router.get("/logout", AuthMiddleware.redirectLogin, StaffController.logout);
router.get("/staff", AuthMiddleware.redirectLogin, StaffController.staffList);
router.get("/settings", AuthMiddleware.redirectLogin, StaffController.setting);
router.post("/update-password", AuthMiddleware.redirectLogin, StaffController.changePassword);
router.get("/process", AuthMiddleware.redirectLogin, StaffController.processCustomer);

module.exports = router