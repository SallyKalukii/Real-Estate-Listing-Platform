const User = require('../models/User');

const findOrCreateUser = async (googleId, email, name) => {
    let user = await User.findByGoogleId(googleId);
    if (!user) {
        user = await User.create(googleId, email, name);
    }
    return user;
};

module.exports = {
    findOrCreateUser,
};