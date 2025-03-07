import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection, OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { TableActivityDto } from '../dto/table-activity.dto';
import { CursorActivityDto } from '../dto/cursor-activity.dto';

@WebSocketGateway(80, { cors: { origin: "*" } })
export class TableActivityGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(TableActivityGateway.name);

  @WebSocketServer() io: Server;

  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.io.sockets;

    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }
  afterInit(server: any) {
    this.logger.log("Initialized");
  }
  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  @SubscribeMessage("todo")
  handleTodo(@MessageBody() todo: TableActivityDto, @ConnectedSocket() client: Socket) {
    this.logger.log("Incoming todo", todo)
    client.broadcast.emit("todo", todo)
  }

  @SubscribeMessage("cursor")
  handleCursor(@MessageBody() todo: CursorActivityDto, @ConnectedSocket() client: Socket) {
    this.logger.log("Incoming cursor", todo)
    client.broadcast.emit("cursor", todo)
  }
}
