const bcryptjs = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    //não incluir campos de id ou referência
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
    password_hash: DataTypes.STRING,
    provider: DataTypes.BOOLEAN,
  }, {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcryptjs.hash(user.password, 8)
          }
        }
      }
    });

  User.prototype.checkPassword = function (password) {
    return bcryptjs.compare(password, this.password_hash)
  }

  return User;
};
