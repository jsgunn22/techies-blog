const { BlogPost } = require("../models");

const blogPostData = [
  {
    blog_title: "How to pet a dog",
    blog_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    blog_author: "Jeffrey",
  },
  {
    blog_title: "Cats and how to avoid being murdered in your sleep",
    blog_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    blog_author: "Sarah",
  },
  {
    blog_title: "Should have just gotten a gold fish",
    blog_description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    blog_author: "Tucker",
  },
];

const seedBlogPosts = () => BlogPost.bulkCreate(blogPostData);

module.exports = seedBlogPosts;
