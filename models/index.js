const BlogPost = require("./BlogPost");
const Comment = require("./Comment");

Comment.belongsTo(BlogPost, {
  foreignKey: "blog_id",
});

BlogPost.hasMany(Comment, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

module.exports = {
  BlogPost,
  Comment,
};
