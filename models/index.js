const BlogPost = require("./BlogPost");
const Comment = require("./Comment");
const User = require("./User");

BlogPost.hasOne(User, {
  foreignKey: "id",
});

User.hasMany(BlogPost, {
  foreignKey: "blog_author",
});

Comment.belongsTo(BlogPost, {
  foreignKey: "blog_id",
});

BlogPost.hasMany(Comment, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "comment_author",
});

User.hasMany(Comment, {
  foreignKey: "comment_author",
});

module.exports = {
  BlogPost,
  Comment,
  User,
};
