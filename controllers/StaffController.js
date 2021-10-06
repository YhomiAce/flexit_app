const sequelize = require("../config/db");
const Department = require("../models/Department");
const Staff = require("../models/Staff");
const moment = require("moment");
const bcrypt = require("bcryptjs");

exports.createNewStaff = async(req, res, next) =>{
    sequelize.transaction(async t =>{
        try {
            const {password, name, email, departmentId} = req.body;
            if (!name || !email || !password || !departmentId) {
                req.flash("warning", "Please Enter all field");
                res.redirect("back")
            }else if (password.length < 5) {
                req.flash("warning", "Password Length is too short");
                res.redirect("back")
            }else{
                const user = await Staff.findOne({where:{email}});
                if (user) {
                    req.flash("warning", "User Already exist");
                    res.redirect("back")
                }else{

                    const hasPassword = bcrypt.hashSync(password, 10);
                    let request = {
                        name,
                        email,
                        departmentId,
                        password: hasPassword
                    }
                    const department = await Department.findByPk(departmentId);
                    if (department.name === "Front Desk") {
                        request.role = 2
                    }else if (department.name === "ICT") {
                        request.role = 3
                    }
                    
                    await Staff.create(request,{transaction: t});
                    
                }
            }
            req.flash("success", "Employee Created Successfully");
            res.redirect("/staff")
        } catch (error) {
            t.rollback();
            console.log(error);
            req.flash("error", "Server Error!")
            res.redirect("back")
        }
    })
}

exports.createStaffView = async(req, res) =>{
    try {
        const departments = await Department.findAll();
        // console.log(departments);
        res.render("register",{
            departments,
            moment
        })
    } catch (error) {
        res.redirect("/")
    }
}

exports.newStaff = async(req, res) =>{
    try {
        const departments = await Department.findAll();
        const user = await Staff.findOne({where:{id:req.session.userId}})
        // console.log(departments);
        res.render("create_staff",{
            departments,
            moment,
            user
        })
    } catch (error) {
        req.flash("warning", "Server Error")
        res.redirect("/home")
    }
}

exports.login = async(req, res) =>{
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            req.flash("danger", "Please Fill All Field")
            res.redirect("back")
        }else{
            const user = await Staff.findOne({where:{email}});
            if (!user) {
                req.flash("danger", "Invalid Credential")
                res.redirect("back")
            }else{
                const isMatch = await bcrypt.compareSync(password, user.password);
                if (!isMatch) {
                    req.flash("danger", "Invalid Credentials")
                    res.redirect("back")
                }else{
                    req.session.userId = user.id;
                    req.flash("success", "Login Sucessfully")
                    res.redirect("/home")
                }
            }
        }
    } catch (error) {
        req.flash("danger", "Server Error")
        res.redirect("back")
    }
}

exports.home = async(req, res) =>{
    try {
        const user = await Staff.findOne({where:{id:req.session.userId}, include:["department"]});
        
        res.render("index",{
            user,
            moment
        })
    } catch (error) {
        req.flash("warning", "Server Error")
        res.redirect("/home")
    }
}

exports.staffList = async(req,res) =>{
    try {
        const user = await Staff.findOne({where:{id:req.session.userId}, include:["department"]});
        const staffs = await Staff.findAll({order:[["createdAt", "DESC"]], include:["department"]})
        res.render("all_staff",{
            user,
            moment,
            staffs
        })
    } catch (error) {
        req.flash("warning", "Server Error")
        res.redirect("/home")
    }
}

exports.setting = async(req,res) =>{
    try {
        const user = await Staff.findOne({where:{id:req.session.userId}, include:["department"]});
        res.render("setting",{
            user,
            moment,
        })
    } catch (error) {
        req.flash("warning", "Server Error")
        res.redirect("/home")
    }
}

exports.processCustomer = async(req, res) =>{

}

exports.changePassword = (req, res, next) => {
    const { oldPassword, password, confirmPassword } = req.body;
    // check if any of them are empty
    if (!oldPassword || !password || !confirmPassword) {
      req.flash("warning", "enter all fields");
      res.redirect("back");
    } else if (confirmPassword != password) {
      req.flash("warning", "passwords must match");
      res.redirect("back");
    } else if (confirmPassword.length < 6 || password.length < 6) {
      req.flash("warning", "passwords must be greater than 5 letters");
      res.redirect("back");
    } else {
      Staff.findOne({
        where: {
          id:  req.session.userId
        },
      })
        .then((response) => {
          if (bcrypt.compareSync(oldPassword, response.password)) {
            // password correct
            // update it then
            let currentPassword = bcrypt.hashSync(password, 10);
            Staff.update(
              {
                password: currentPassword,
              },
              {
                where: {
                  id: req.session.userId
                },
              }
            )
              .then((response) => {
                req.flash("success", "Password updated successfully");
                res.redirect("back");
              })
              .catch((error) => {
                req.flash("error", "something went wrong");
                res.redirect("back");
              });
          } else {
            req.flash("warning", "incorrect old password");
            res.redirect("back");
          }
        })
        .catch((error) => {
          req.flash("danger", "something went wrong");
          res.redirect("back");
        });
    }
  };

exports.logout = (req, res, next) => {
    // req.session.destroy(err => {
    //     if (err) {
    //         return res.redirect("/home");
    //     }
    //     res.clearCookie(parameters.SESSION_NAME);
    //     res.redirect("/");
    // });
    req.session.userId = null;
    res.redirect("/");
  };