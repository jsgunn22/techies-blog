const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class BlogPost extends Model {}

BlogPost.init(
  {
    blog_title: {
      type: DataTypes.STRING,
    },
    blog_description: {
      type: DataTypes.STRING,
    },
    blog_author: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "blog_post",
  }
);

module.exports = BlogPost;
