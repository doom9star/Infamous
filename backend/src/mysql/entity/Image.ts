import { AfterLoad, Column, Entity } from "typeorm";
import Base from "./Base";

@Entity("images")
export default class Image extends Base {
  @Column()
  filename: string;

  public url: string;

  @AfterLoad()
  setUrl() {
    this.url = "http://localhost:4000/" + this.filename;
  }
}
