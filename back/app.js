const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const { grapqlSchema } = require("./graphql/schema");
const { resolvers } = require("./graphql/root");
const { root } = require("./graphql/root");
const { default: mongoose } = require("mongoose");
const { applyMiddleware } = require("graphql-middleware");
const { permissions } = require("./guard/guards");
const { JwtService } = require("./services/Jwt.service");

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/graphql",
  graphqlHTTP((req) => {
    const { authorization = "" } = req.headers;

    const token = authorization.split("Bearer ")[1];

    const user = token ? JwtService.verifyAccessToken(token) : null;

    return {
      schema: makeExecutableSchema({ typeDefs: grapqlSchema, resolvers }),
      graphiql: {
        headerEditorEnabled: true,
      },
      context: { user },
      /* rootValue: root, */
    };
  })
);

/* graphqlHTTP({
  graphiql: true,
  schema: grapqlSchema,
  graphiql: {
    headerEditorEnabled: true,
  },
  context: ({ req }) => {
    const { authorization } = req;

    const token = authorization.replace("Bearer", "").trim();
    const user = JwtService.verifyAccessToken(token) || null;
    ``;

    return { user };
  },
  rootValue: root,
}) */

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://cesar:cesar@cluster0.2n511no.mongodb.net/blog?retryWrites=true&w=majority"
    );
  } catch (error) {
    console.error(error);
  }
};

start();

module.exports = app;
