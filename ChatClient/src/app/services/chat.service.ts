import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: Socket) {}

  getMessagesForGroupId(id: string) {
    const event = 'newMessage-' + id;
    console.log(event + ' is listening');
    return this.socket.fromEvent<Message>(event);
  }

  sendMessage(message: Message) {
    return this.socket.emit('sendMessage', message);
  }
}
