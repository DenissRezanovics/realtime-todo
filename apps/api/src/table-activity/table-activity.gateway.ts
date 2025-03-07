import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { TableActivityDto } from '../dto/table-activity.dto';
import { CursorActivityDto } from '../dto/cursor-activity.dto';
import { Events } from '@todo/shared';

@WebSocketGateway({ cors: { origin: '*' } })
export class TableActivityGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(TableActivityGateway.name);

  @WebSocketServer() io: Server;

  public handleConnection(client: Socket) {
    const { sockets } = this.io.sockets;

    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  public handleDisconnect(client: Socket) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  @SubscribeMessage(Events.TODO)
  public handleTodo(
    @MessageBody() todo: TableActivityDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.log('Incoming todo', todo);
    client.broadcast.emit(Events.TODO, todo);
  }

  @SubscribeMessage(Events.CURSOR)
  public handleCursor(
    @MessageBody() todo: CursorActivityDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.log('Incoming cursor', todo);
    client.broadcast.emit(Events.CURSOR, todo);
  }
}
