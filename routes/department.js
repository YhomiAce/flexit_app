const express = require("express");

const router = express.Router();

const DepartmentController = require("../controllers/DepartmentController");
const AuthMiddleware = require("../middleware/Auth");

router.post("/add-department", AuthMiddleware.redirectLogin, DepartmentController.addDepartment);
router.get("/department", AuthMiddleware.redirectLogin, DepartmentController.departmentPage)

module.exports = router