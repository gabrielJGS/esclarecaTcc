const { authSecret } = require("../.env");
const passport = require("passport");
const passportJwt = require("passport-jwt");
const { Strategy, ExtractJwt } = passportJwt;
const Users = require("../models/Users");

module.exports = (app) => {
  const params = {
    secretOrKey: authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  const strategy = new Strategy(params, (payload, done) => {
    const u = Users.findById(payload.id)
      .then((user) => {
        if (user) {
          done(null, {
            id: user.id,
            name: user.name,
            email: user.email,
            tags: user.tags,
            followed: user.followed,
            blocked: user.blocked,
            ranking: user.ranking
          });
        } else {
          done(null, false);
        }
      })
      .catch((err) => done(err, false));
  });
  passport.use(strategy);
  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate("jwt", { session: false }),
  };
};
