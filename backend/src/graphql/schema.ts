import path from "path";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { applyMiddleware } from "graphql-middleware";
import { AuthMiddlewareMap } from "./middlewares";

const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "./typeDefs/**/*.gql"))
);
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "./resolvers")) as []
);

export default applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  AuthMiddlewareMap
);
