import { sign, verify } from "jsonwebtoken";
import { AuthPayload } from "./ctypes";
import fs from "fs";
import path from "path";

export namespace Utils {
  export function isEmail(s: string): string | null {
    const regexp = /^([\w&.-]{1,64})@gmail\.[\w.]{1,63}/;
    const result = s.match(regexp);
    return !result ? null : result[1];
  }

  export function encryptToken(payload: AuthPayload): string {
    const token = sign(payload, process.env.SECRET!, { expiresIn: "7d" });
    return token;
  }

  export function decryptToken(token: string | undefined): AuthPayload | null {
    if (!token) return null;
    try {
      const payload = verify(token, process.env.SECRET!) as AuthPayload;
      return payload;
    } catch (error) {
      return null;
    }
  }

  export function createImage(filename: string, file: any): void {
    const stream = file.createReadStream();
    const out = fs.createWriteStream(
      path.join(__dirname, `../../images/${filename}`)
    );
    stream.pipe(out);
  }

  export function deleteImage(filename: string): void {
    fs.unlinkSync(path.join(__dirname, `../../images/${filename}`));
  }
}
