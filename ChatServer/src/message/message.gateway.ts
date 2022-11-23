/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger = new Logger('MessageGateway');

  handleDisconnect(client: any) {
    console.log(`Client ${client.id} is disconnected`);
  }
  handleConnection(client: any, ...args: any[]) {
    console.log(`Client ${client.id} is connected`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: any, payload: any): any {
    console.log(payload);
    
    const event = 'newMessage-' + payload.groupId;
    return this.server.emit(event, payload);
  }
}
