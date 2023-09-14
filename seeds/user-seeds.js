const { User } = require("../models");
const bcrypt = require("bcrypt");

const usersData = [
  {
    user_name: "Jeffrey",
    email: "jgunn@home.com",
    password: "ZYXW",
  },
  {
    user_name: "Sarah",
    email: "sinskip@home.com",
    password: "abcd",
  },
  {
    user_name: "Luna",
    user_email: "lbonkers@home.com",
    password: "!@#$",
  },
];

const seedUsers = () => User.bulkCreate(usersData);

module.exports = seedUsers;
