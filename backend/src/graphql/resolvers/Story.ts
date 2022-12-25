import { nanoid } from "nanoid";
import { Like } from "typeorm";
import Image from "../../mysql/entity/Image";
import { Story } from "../../mysql/entity/Story";
import { User } from "../../mysql/entity/User";
import { _24HRS } from "../../ts/constants";
import { Ctx } from "../../ts/ctypes";
import { Utils } from "../../ts/utils";
import { Resolvers, StoryType, UpdateImageState } from "../types";

export default {
  Mutation: {
    createStory: async (_, { args }, { req }) => {
      const uid = req.user!.uid;
      const { title, thumbnail } = args;

      const storyThumbnail = await thumbnail;
      const user = await User.findOne({
        where: { id: uid },
      });
      if (!user) return { status: 404 };

      const story = new Story();
      story.title = title;
      story.pages = [""];
      story.user = user;
      if (thumbnail) {
        const filename = `${nanoid()}.${storyThumbnail.mimetype.split("/")[1]}`;
        Utils.createImage(filename, storyThumbnail);
        const image = new Image();
        image.filename = filename;
        image.setUrl();
        story.thumbnail = image;
      }
      await story.save();

      return { status: 200, id: story.id };
    },

    updateStory: async (_, { args }) => {
      const { sid, thumbnail, thumbnailState, ...values } = args;

      if (thumbnailState !== UpdateImageState.None) {
        const story = await Story.findOne({
          where: { id: sid },
          relations: ["thumbnail"],
        });
        if (!story) return { status: 404 };

        const storyThumbnail = await thumbnail;

        if (story.thumbnail) {
          Utils.deleteImage(story.thumbnail.filename);
          await story.thumbnail.remove();
        }

        if (thumbnailState === UpdateImageState.Update) {
          const filename = `${nanoid()}.${
            storyThumbnail.mimetype.split("/")[1]
          }`;
          Utils.createImage(filename, storyThumbnail);
          const image = new Image();
          image.filename = filename;
          story.thumbnail = image;
          await story.save();
        }
      }
      await Story.update({ id: sid }, { ...values });
      return { status: 200 };
    },

    deleteStory: async (_, { sid }) => {
      await Story.delete({ id: sid });
      return { status: 200 };
    },
  },
  Query: {
    getStory: async (_, { sid }, { req }) => {
      const story = await Story.createQueryBuilder("s")
        .leftJoinAndSelect("s.thumbnail", "st")
        .leftJoinAndSelect("s.user", "su")
        .leftJoinAndSelect("su.avatar", "sua")
        .where("s.id = :sid", { sid })
        .getOne();
      if (!story) return { status: 404 };
      return { status: 200, story };
    },

    getStories: async (_, { uid, type, genre }, { req }) => {
      if (type === StoryType.Public) {
        const stories = await Story.createQueryBuilder("s")
          .leftJoinAndSelect("s.thumbnail", "st")
          .leftJoinAndSelect("s.user", "su")
          .leftJoinAndSelect("su.avatar", "sua")
          .where("s.published = 1")
          .andWhere("s.genre like :genre", {
            genre: `%${genre === "All" ? "" : genre}%`,
          })
          .getMany();
        return { status: 200, public: stories };
      } else if (type === StoryType.Private) {
        const id = uid ? uid : req.user.uid;
        const published = await Story.createQueryBuilder("s")
          .leftJoinAndSelect("s.thumbnail", "st")
          .leftJoinAndSelect("s.user", "su")
          .leftJoinAndSelect("su.avatar", "sua")
          .where("su.id = :id", { id })
          .andWhere("s.published = 1")
          .getMany();
        const unpublished = await Story.createQueryBuilder("s")
          .leftJoinAndSelect("s.thumbnail", "st")
          .leftJoinAndSelect("s.user", "su")
          .leftJoinAndSelect("su.avatar", "sua")
          .where("su.id = :id", { id })
          .andWhere("s.published = 0")
          .getMany();
        return { status: 200, published, unpublished };
      }
      return { status: 400 };
    },

    getSearchStories: async (_, { query }) => {
      const stories = await Story.find({
        where: { title: Like(`%${query}%`), published: true },
        relations: ["thumbnail", "user"],
      });
      return { status: 200, stories };
    },
  },
} as Resolvers<Ctx>;
