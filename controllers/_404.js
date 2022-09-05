// CONTROL FUNCTION
module.exports._404CTRL = (req, res) => {
    res.render("_404", { title: `404 "${req.url}" not found`, url: req.url, navLink: null });
};
