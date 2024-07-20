const router = require('express').Router();
const passport = require('passport');

const CLIENT_URL = 'http://localhost:5173/';
const CLIENT_URL_FAILED = 'http://localhost:5173/login';

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure"
    });
});

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successful", 
            user: req.user,
        });
    }
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect(CLIENT_URL);
    });
});

// Google OAuth login route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: CLIENT_URL_FAILED }),
    (req, res) => {
        res.redirect(CLIENT_URL);
    }
);

// GitHub OAuth login route
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub OAuth callback route
router.get('/github/callback', 
    passport.authenticate('github', { failureRedirect: CLIENT_URL_FAILED }),
    (req, res) => {
        res.redirect(CLIENT_URL);
    }
);

// Facebook OAuth login route
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Facebook OAuth callback route
router.get('/facebook/callback', 
    passport.authenticate('facebook', { failureRedirect: CLIENT_URL_FAILED }),
    (req, res) => {
        res.redirect(CLIENT_URL);
    }
);

module.exports = router;
