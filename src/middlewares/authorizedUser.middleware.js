const env = require("../config/env");
const error = require("../messages/error.message");

function authorizedUser(ctx, next) {
    const currentUser = ctx?.message?.from?.username;
    const authorizedUsers = env.users;

    const authorizedUsersArray = authorizedUsers?.split(",");

    if (!authorizedUsersArray.includes(currentUser))
        return ctx.replyWithHTML(error.unauthorized);

    return next();
}

module.exports = authorizedUser;
