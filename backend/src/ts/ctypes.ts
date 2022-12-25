import { Connection } from "typeorm";
import { Request, Response } from "express";

export type AuthRequest = Request & { user?: AuthPayload | null };

export interface Ctx {
  req: AuthRequest;
  res: Response;
  conn: Connection;
}

export interface AuthPayload {
  uid: string;
}
