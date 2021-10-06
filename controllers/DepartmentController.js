const sequelize = require("../config/db");
const Department = require("../models/Department");
const moment = require("moment");
const Staff = require("../models/Staff");

exports.addDepartment = async(req, res, next) =>{
    sequelize.transaction(async t =>{
        try {
            await Department.upsert(req.body,{transaction: t})
            req.flash("success", "Department Saved successfully");
            res.redirect("/home")
        } catch (error) {
            t.rollback();
            console.log(error);
            req.flash("error", "Server Error!")
            res.redirect("back")
        }
    })
}

exports.departmentPage = async(req, res) =>{
    try {
        const departments = await Department.findAll({order:[["createdAt", "ASC"]]});
        const user = await Staff.findOne({where:{id:req.session.userId}})
        // console.log(departments);
        res.render("department",{
            departments,
            moment,
            user
        })
    } catch (error) {
        res.redirect("/home")
    }
}