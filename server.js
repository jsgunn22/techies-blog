const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const hbs = exphbs.create({});
const app = express();
const PORT = process.env.PORT || 3000;
const sequelize = require("./config/connection");

const sess = {
  secret: "Super secret secret",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./controllers/index"));

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`);
  });
});
