import { IMiddlewareFunction, IMiddlewareTypeMap } from "graphql-middleware";
import { Ctx } from "../ts/ctypes";
import { Utils } from "../ts/utils";

const AuthMiddlewareHelper: IMiddlewareFunction = (
  resolve,
  parent,
  args,
  context,
  info
) => {
  const token = context.req.cookies.token;
  const payload = Utils.decryptToken(token);
  if (!payload) return context.res.json({ status: 401 });
  context.req.user = payload;
  const result = resolve(parent, args, context, info);
  return result;
};

export const AuthMiddlewareMap = {
  Query: {
    getUser: (resolve, parent, args, context, info) => {
      return AuthMiddlewareHelper(resolve, parent, args, context, info);
    },
    getStory: (resolve, parent, args, context, info) => {
      return AuthMiddlewareHelper(resolve, parent, args, context, info);
    },
    getStories: (resolve, parent, args, context, info) => {
      return AuthMiddlewareHelper(resolve, parent, args, context, info);
    },
  },
  Mutation: {
    updateUser: (resolve, parent, args, context, info) => {
      return AuthMiddlewareHelper(resolve, parent, args, context, info);
    },
    deleteUser: (resolve, parent, args, context, info) => {
      return AuthMiddlewareHelper(resolve, parent, args, context, info);
    },
    createStory: (resolve, parent, args, context, info) => {
      return AuthMiddlewareHelper(resolve, parent, args, context, info);
    },
    updateStory: (resolve, parent, args, context, info) => {
      return AuthMiddlewareHelper(resolve, parent, args, context, info);
    },
    deleteStory: (resolve, parent, args, context, info) => {
      return AuthMiddlewareHelper(resolve, parent, args, context, info);
    },
  },
} as IMiddlewareTypeMap<any, Ctx, any>;
