import { User } from "../../mysql/entity/User";
import { Resolvers } from "../types";
import { Utils } from "../../ts/utils";
import { Ctx } from "../../ts/ctypes";
import { _24HRS } from "../../ts/constants";

export default {
  Mutation: {
    register: async (_, { args }, { res }) => {
      const { email, password, name } = args;

      const user = new User();
      user.email = email;
      user.password = password;
      user.name = name;
      await user.save();

      const token = Utils.encryptToken({ uid: user.id });
      res.cookie("token", token, {
        maxAge: _24HRS,
      });

      return { status: 200, user };
    },

    login: async (_, { args }, { res }) => {
      const { email, password } = args;

      const user = await User.findOne({
        where: { email },
        relations: ["avatar", "banner"],
      });
      if (!user) return { status: 404 };
      if (!(await user.comparePassword(password))) return { status: 401 };

      const token = Utils.encryptToken({ uid: user.id });
      res.cookie("token", token, {
        maxAge: _24HRS,
      });
      return { status: 200, user };
    },

    logout: (_, __, { res }) => {
      res.clearCookie("token");
      return { status: 200 };
    },
  },
} as Resolvers<Ctx>;
