const env = require("../config/env");

module.exports = function authorizedUser(ctx, next) {
  const user = ctx?.message?.from?.username;
  const authrizedUsers = env.users;
  const authorizedUsersArray = authrizedUsers.split(",");

  if (!authorizedUsersArray.includes(user)) return ctx.reply("não autorizado");

  return next();
};
