const router = require('express').Router();
const passport = require('passport');

// Route to start GitHub OAuth login
router.get('/login',
    passport.authenticate('github', { scope: ['user:email']})
);

// GitHub callback route
router.get('/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/api-docs',
    }),
    (req, res) => {
        res.redirect('/');
    }
);

// Logout route
router.get('/logout', function(req, res, next)  {
    req.logout(function(err) {
        if (err) { return next(err); }

        req.session.destroy(() => {
            res.redirect('/');
        });
    });
});

module.exports = router;