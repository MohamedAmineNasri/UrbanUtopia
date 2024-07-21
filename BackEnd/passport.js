const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('./models/User');
require('dotenv').config(); // Load environment variables

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            username: profile.displayName || 'No Name',
            firstName: profile.name?.givenName || 'No First Name',
            lastName: profile.name?.familyName || 'No Last Name',
            email: (profile.emails && profile.emails[0] && profile.emails[0].value) || 'No Email',
            profilePicture: (profile.photos && profile.photos[0] && profile.photos[0].value) || 'No Picture',
            locale: profile._json?.locale || 'No Locale',
          });
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// passport.use(
//   new GithubStrategy(
//     {
//       clientID: GITHUB_CLIENT_ID,
//       clientSecret: GITHUB_CLIENT_SECRET,
//       callbackURL: "/auth/github/callback",
//     },
//     async function (accessToken, refreshToken, profile, done) {
//       try {
//         let user = await User.findOne({ githubId: profile.id });

//         if (!user) {
//           user = new User({
//             githubId: profile.id,
//             username: profile.username,
//             email: (profile.emails && profile.emails[0] && profile.emails[0].value) || 'No Email',
//             profilePicture: (profile.photos && profile.photos[0] && profile.photos[0].value) || 'No Picture',
//           });
//           await user.save();
//         }

//         return done(null, user);
//       } catch (err) {
//         return done(err, null);
//       }
//     }
//   )
// );

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_APP_ID,
//       clientSecret: FACEBOOK_APP_SECRET,
//       callbackURL: "/auth/facebook/callback",
//     },
//     async function (accessToken, refreshToken, profile, done) {
//       try {
//         let user = await User.findOne({ facebookId: profile.id });

//         if (!user) {
//           user = new User({
//             facebookId: profile.id,
//             username: profile.displayName,
//             email: (profile.emails && profile.emails[0] && profile.emails[0].value) || 'No Email',
//             profilePicture: (profile.photos && profile.photos[0] && profile.photos[0].value) || 'No Picture',
//           });
//           await user.save();
//         }

//         return done(null, user);
//       } catch (err) {
//         return done(err, null);
//       }
//     }
//   )
// );

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
