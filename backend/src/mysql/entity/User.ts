import { compare, hash } from "bcrypt";
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import Base from "./Base";
import Image from "./Image";
import { Story } from "./Story";

@Entity({ name: "users" })
export class User extends Base {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: "text", nullable: true })
  bio?: string;

  @Column({ default: false })
  anonymous: boolean;

  @OneToOne(() => Image, { cascade: true, onDelete: "SET NULL" })
  @JoinColumn()
  avatar?: Image;

  @OneToOne(() => Image, { cascade: true, onDelete: "SET NULL" })
  @JoinColumn()
  banner?: Image;

  @OneToMany(() => Story, (story) => story.user, {
    cascade: true,
  })
  stories?: Story[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 12);
  }

  async comparePassword(password: string): Promise<boolean> {
    const valid = await compare(password, this.password);
    return valid;
  }
}
