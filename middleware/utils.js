// MIDDLEWARE FUNCTIONS
// method override
const methodOverride = (req, res, next) => {
    // destructure custom method from req query
    const { _method } = req.query;
    // check for custom method
    if (!_method) return next();
    // set req method to custom method
    req.method = _method.toUpperCase();
    // next
    next();
};

// EXPORTS
module.exports = { methodOverride };
