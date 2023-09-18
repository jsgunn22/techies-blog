const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./controllers/index"));

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`);
  });
});
