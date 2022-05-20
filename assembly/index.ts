import { logging } from "near-sdk-as";

import { PostedMessage, messages } from './model';

export function sendMessage(message: string): void {
  const newMessage = new PostedMessage(message);

  messages.push(newMessage);
}

export function getMessages(): PostedMessage[] {
  const result = new Array<PostedMessage>();

  for(let i = 0; i < messages.length; i++) {
    result[i] = messages[i];
  }

  return result;
}

export function clearChat(): void {
  for(let i = messages.length-1; i >= 0 ; i--) {
    messages.pop();
  }
}