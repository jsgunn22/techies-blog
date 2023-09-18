const BlogPost = require("./BlogPost");
const Comment = require("./Comment");
const User = require("./User");

BlogPost.belongsTo(User, {
  foreignKey: "blog_author",
});

User.hasMany(BlogPost, {
  foreignKey: "blog_author",
});

BlogPost.hasMany(Comment, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(BlogPost, {
  foreignKey: "blog_id",
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
