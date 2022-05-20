import { context, u128, PersistentVector } from "near-sdk-as";

@nearBindgen
export class PostedMessage {
  user: string;
  datetime: u64;
  constructor(public message: string) {
    this.user = context.sender;
    this.datetime = context.blockTimestamp;
  }
}

export const messages = new PersistentVector<PostedMessage>("m");