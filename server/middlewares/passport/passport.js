if(process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}
const User = require("../../models/User");
const { Strategy, ExtractJwt } = require("passport-jwt");

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey:process.env.SECRET,
};

module.exports = (passport) => {
	passport.use(
		new Strategy(opts, async (payload, done) => {
			await User.findById(payload.user_id)
				.then(async (user) => {
					if (user) {
						return done(null, user);
					}
					return done(null, false);
				})
				.catch((err) => {
					return done(null, false);
				});
		}),
	);
};
