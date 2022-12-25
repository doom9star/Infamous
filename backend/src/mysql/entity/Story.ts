import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

import Base from "./Base";
import Image from "./Image";
import { User } from "./User";

@Entity("stories")
export class Story extends Base {
  @Column()
  title: string;

  @OneToOne(() => Image, { onDelete: "SET NULL", cascade: true })
  @JoinColumn()
  thumbnail?: Image;

  @Column({ default: false })
  published: boolean;

  @Column({ type: "simple-json" })
  pages: string[];

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ nullable: true })
  genre: string;

  @ManyToOne(() => User, (user) => user.stories, {
    onDelete: "CASCADE",
  })
  user: User;
}
