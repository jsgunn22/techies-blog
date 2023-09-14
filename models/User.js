const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");
const bcrypt = require("bcrypt");

class User extends Model {
  checkPassword(loginPW) {
    let unEncrypt = bcrypt.compareSync(loginPW, this.password);

    if (unEncrypt) {
      return true;
    } else {
      if (loginPW === this.password) {
        return true;
      } else {
        return false;
      }
    }
    // return bcrypt.compareSync(loginPW, this.password);
  }
}

User.init(
  {
    user_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
