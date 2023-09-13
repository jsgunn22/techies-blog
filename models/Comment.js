const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class Comment extends Model {}

Comment.init(
  {
    comment_author: {
      type: DataTypes.STRING,
    },
    comment_description: {
      type: DataTypes.STRING,
    },
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "blog_post",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
