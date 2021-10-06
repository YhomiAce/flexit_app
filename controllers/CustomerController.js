const sequelize = require("../config/db");
const Department = require("../models/Department");
const Customer = require("../models/Customer");
const moment = require("moment");
const Staff = require("../models/Staff");

exports.addDepartment = async(req, res, next) =>{
    sequelize.transaction(async t =>{
        try {
            await Customer.create(req.body, {transaction: t});
            req.flash("success", "Customer Logged successfully");
            res.redirect("back")
        } catch (error) {
            t.rollback();
            console.log(error);
            req.flash("error", "Server Error!")
            res.redirect("back")
        }
    })
}

exports.signCustomerIn = async(req, res) =>{
    try {
        const customers = await Customer.findAll({order:[["createdAt", "DESC"]]});
        const user = await Staff.findOne({where:{id:req.session.userId}})
        
        res.render("customer",{
            customers,
            moment,
            user
        })
    } catch (error) {
        res.redirect("/home")
    }
}