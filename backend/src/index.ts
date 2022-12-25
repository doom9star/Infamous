import "reflect-metadata";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import schema from "./graphql/schema";
import { graphqlUploadExpress } from "graphql-upload";

(async () => {
  dotenv.config({ path: "../.env" });
  const conn = await createConnection();

  const app = express();

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, conn }),
  });
  await server.start();

  app.use(cors({ credentials: true, origin: process.env.FRONTEND }));
  app.use(cookieParser());
  app.use(graphqlUploadExpress());
  server.applyMiddleware({
    app,
    cors: false,
    // cors: {credentials: true, origin: process.env.FRONTEND},
  });
  app.use(express.static("images/"));

  app.listen(4000, () => {
    console.info(
      `\n🚀 GraphQL SERVER running at http://localhost:4000${server.graphqlPath}`
    );
  });
})();
