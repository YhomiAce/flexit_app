exports.redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect("/");
    } else {
        next();
    }
}