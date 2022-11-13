import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();

  private messagesUrl =
    'https://wdd430-cms-2022-default-rtdb.firebaseio.com/messages.json';
  private messages: Message[] = [];
  private maxMessageId: number;

  constructor(private http: HttpClient) {}

  //#region "Firebase"
  // GET REQUEST
  getMessages(): Message[] {
    this.http.get<Message[]>(this.messagesUrl).subscribe((msgs: Message[]) => {
      this.messages = msgs;
      this.maxMessageId = this.getMaxId();
      this.messages.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });
      this.messageChangedEvent.next(this.messages.slice());
    });

    return this.messages.slice();
  }

  // PUT REQUEST
  storeMessages() {
    this.http
      .put(this.messagesUrl, JSON.stringify(this.messages), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(() => {
        this.messages.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.messageChangedEvent.next(this.messages.slice());
      });
  }
  //#endregion "Firebase"

  //#region "CRUD"
  addMessage(newMessage: Message) {
    if (newMessage === null || newMessage === undefined) return;
    this.maxMessageId++;
    newMessage.id = `${this.maxMessageId}`;
    this.messages.push(newMessage);
    this.storeMessages();
  }

  getMessage(id: string): Message {
    return this.messages.find((m) => m.id === id);
  }
  //#endregion "CRUD"

  //#region "Helpers"
  getMaxId(): number {
    let maxId = 0;
    this.messages.forEach((m) => {
      if (+m.id > maxId) maxId = +m.id;
    });
    return maxId;
  }
  //#endregion "Helpers"
}
