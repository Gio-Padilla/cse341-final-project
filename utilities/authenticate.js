const isAuthenticated = (req, res, next) => {
    // Check to see if the user is authenticated
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }

    // If not, deny access
    return res.status(401).json({ error: "You do not have access." });
};

const isManager = (req, res, next) => {
    // Make sure the user is logged in
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({ error: "You do not have access." });
    }

    // Then check their role, manager tag
    if (req.user.role !== 'manager') {
        return res.status(403).json({ error: "Manager access required." });
    }

    // User is authenticated and is a manager
    return next();
};

module.exports = {
    isAuthenticated,
    isManager
};