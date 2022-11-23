import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  messages$?: Observable<Message>;
  name: string = '';
  groupId: string = '';
  messages: Message[] = [];
  messageData: string = '';
  constructor(private chatService: ChatService) {}

  send() {
    const newMessage: Message = {
      from: this.name,
      content: this.messageData,
      createdAt: Date.now(),
      groupId: this.groupId,
    };
    this.chatService.sendMessage(newMessage);
  }

  accessForGroup() {
    this.messages$ = this.chatService.getMessagesForGroupId(this.groupId);
    this.messages$.subscribe((message) => {
      console.log(message);
      this.messages.push(message);
    });
  }
}
