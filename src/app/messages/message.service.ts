import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
  
export class MessageService {
  private messages: Message[];
  messageChangedEvent = new EventEmitter<Message[]>();
  constructor() {
    this.messages = MOCKMESSAGES;
  }
  
  getMessages() {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    let selected = null
    this.messages.forEach(message => {
      if (message.id === id) {
        selected = message
      }
    })
    return selected;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());

  }
}
