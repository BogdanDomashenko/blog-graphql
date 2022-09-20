const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const ws = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { execute, subscribe } = require("graphql");
const pubsub = require("./helpers/pubsub");
const { server } = require("./bin/www");

const { grapqlSchema } = require("./graphql/schema");
const { resolvers } = require("./graphql/root");
const { default: mongoose } = require("mongoose");
const { JwtService } = require("./services/Jwt.service");

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const schema = makeExecutableSchema({ typeDefs: grapqlSchema, resolvers });

app.use(
  "/graphql",
  graphqlHTTP((req) => {
    const { authorization = "" } = req.headers;

    const token = authorization.split("Bearer ")[1];

    const user = token ? JwtService.verifyAccessToken(token) : null;

    return {
      schema,
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

    console.log(`GraphQL Server running on http://localhost:3000/graphql`);

    /*     const wsServer = new ws.Server({
      port: 4000,
      path: "/subscriptions",
    });

    useServer(
      {
        schema,
        execute,
        subscribe,
        onConnect: (ctx) => {
          console.log("Connect");
        },
        onSubscribe: (ctx, msg) => {
          console.log("Subscribe");
        },
        onNext: (ctx, msg, args, result) => {
          console.debug("Next");
        },
        onError: (ctx, msg, errors) => {
          console.error("Error");
        },
        onComplete: (ctx, msg) => {
          console.log("Complete");
        },
      },
      wsServer
    );
    console.log(`WebSockets listening on ws://localhost:4000/subscriptions`); */
  } catch (error) {
    console.error(error);
  }
};

start();

module.exports = app;
