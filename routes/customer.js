const express = require("express");

const router = express.Router();

const CustomerController = require("../controllers/CustomerController");
const AuthMiddleware = require("../middleware/Auth");

router.post("/new-customer", AuthMiddleware.redirectLogin, CustomerController.addDepartment);
router.get("/sign-in-customer", AuthMiddleware.redirectLogin, CustomerController.signCustomerIn)

module.exports = router