import { User } from "../../mysql/entity/User";
import { Ctx } from "../../ts/ctypes";
import { Resolvers, UpdateImageState } from "../types";
import { GraphQLUpload } from "graphql-upload";
import { nanoid } from "nanoid";
import Image from "../../mysql/entity/Image";
import { Utils } from "../../ts/utils";
import { _24HRS } from "../../ts/constants";

export default {
  Upload: GraphQLUpload,
  Mutation: {
    updateUser: async (_, { args }, { req, conn }) => {
      const uid = req.user!.uid;
      const { avatar, banner, avatarState, bannerState, ...others } = args;

      const userAvatar = await avatar;
      const userBanner = await banner;

      const user = await User.findOne({
        where: { id: uid },
        relations: ["avatar", "banner"],
      });

      if (
        avatarState === UpdateImageState.Update ||
        avatarState === UpdateImageState.Remove
      ) {
        if (user.avatar) {
          Utils.deleteImage(user.avatar.filename);
          await user.avatar.remove();
        }

        if (avatarState === UpdateImageState.Update) {
          const filename = `${nanoid()}.${userAvatar.mimetype.split("/")[1]}`;
          Utils.createImage(filename, userAvatar);
          const image = new Image();
          image.filename = filename;
          user.avatar = image;
          await user.save();
        }
      }

      if (
        bannerState === UpdateImageState.Update ||
        bannerState === UpdateImageState.Remove
      ) {
        if (user.banner) {
          Utils.deleteImage(user.banner.filename);
          await user.banner.remove();
        }

        if (bannerState === UpdateImageState.Update) {
          const filename = `${nanoid()}.${userBanner.mimetype.split("/")[1]}`;
          Utils.createImage(filename, userBanner);
          const image = new Image();
          image.filename = filename;
          user.banner = image;
          await user.save();
        }
      }

      await User.update({ id: uid }, { ...others });
      await conn.queryResultCache?.remove([uid]);

      return { status: 200 };
    },
    deleteUser: async (_, __, { req, res }) => {
      const uid = req.user.uid;
      await User.delete({ id: uid });
      return { status: 200 };
    },
  },
  Query: {
    getUser: async (_, __, { req }) => {
      const uid = req.user!.uid;
      const user = await User.findOne({
        where: { id: uid },
        relations: ["avatar", "banner"],
        cache: { id: uid, milliseconds: _24HRS },
      });
      if (!user) return { status: 404 };
      return { status: 200, user };
    },
  },
} as Resolvers<Ctx>;
