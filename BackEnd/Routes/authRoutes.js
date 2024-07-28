const router = require('express').Router();
const { default: mongoose } = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User')
const CLIENT_URL = 'http://localhost:5173/';
const CLIENT_URL_FAILED = 'http://localhost:5173/login';
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')




router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if(!user) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        const isPassordValid = await bcrypt.compare(password, user.password)
        if (!isPassordValid) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.status(200).json({ token, user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})



router.post('/register', async (req, res) => {
    const { username, firstName, lastName, email, password  } = req.body

    try {
        //Check if user already exists
        const existingUser =  await User.findOne({ email })
        if ( existingUser ) {
            return res.status(400).json({ message: 'User already exists' })
        }

        
        //Create New User 
        const newUser = new User({ username, firstName, lastName, email, password })
            if( password ) {
                newUser.password = password
            }

        await newUser.save()
        
        //Generate JWT
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.status(201).json({ token, user: newUser })

    } catch (error) {
        res.status(500).json({ message: error.message })
    } 

})



router.get('/protected', passport.authenticate('jwt', { session: false }) , (req, res) => {
    res.send('protected get')
})

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
    } else {
        res.status(401).json({
            success: false,
            message: "User not authenticated",
        });
    }
});

const CLIENT_URL_LOGIN = 'http://localhost:5173/login';

router.get('/logout', async (req, res, next) => {
    try {
        await req.logout();
        req.session = null;
        res.clearCookie('connect.sid');
        res.clearCookie('connect.sid.sig');
        return res.status(200).send('Logged out');
    } catch (err) {
        next(err);
    }
});




// Google OAuth login route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: CLIENT_URL_FAILED }),
    (req, res) => {
        // Successful authentication, generate JWT and redirect
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h'})
        res.redirect(`${CLIENT_URL}?token=?{token}`);
    }
);

// GitHub OAuth login route
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub OAuth callback route
router.get('/github/callback', 
    passport.authenticate('github', { failureRedirect: CLIENT_URL_FAILED }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect(CLIENT_URL);
    }
);

// Facebook OAuth login route
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Facebook OAuth callback route
router.get('/facebook/callback', 
    passport.authenticate('facebook', { failureRedirect: CLIENT_URL_FAILED }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect(CLIENT_URL);
    }
);

module.exports = router;
