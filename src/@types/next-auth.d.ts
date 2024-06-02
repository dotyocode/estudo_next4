import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
