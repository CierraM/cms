import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class MessageService {
  private messages: Message[];
  maxId: number;
  messageChangedEvent = new EventEmitter<Message[]>();


  constructor(private http: HttpClient) {
    this.messages = [];
    this.maxId = this.getMaxId();
  }

  getMessages() {
    this.http.get('http://localhost:3000/messages').subscribe((messages: Message[]) => {
      //success
      this.messages = messages;
      this.maxId = this.getMaxId();
      this.messages.sort();
      this.messageChangedEvent.next(this.messages.slice());
    }, (err) => {
      //error
      console.log(err)
    })
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

  getMaxId(): number {
    let maxId = 0;
    this.messages.forEach(document => {
      let currentId = parseInt(document.id)
      if (currentId > maxId) {
        maxId = currentId;
      }
    })

    return maxId
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // add to database
    this.http.post<{ message: Message, }>('http://localhost:3000/messages',
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new message to messages
          this.messages.push(responseData.message);
          this.messageChangedEvent.next(this.messages.slice());
        }
      );

  }

  storeMessages() {
    const payload = JSON.stringify(this.messages);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.put('https://angular-http-57b12-default-rtdb.firebaseio.com/messages.json', payload, { headers: headers }).subscribe(() => {
      this.messageChangedEvent.next(this.messages.slice());
    })
  }
}
