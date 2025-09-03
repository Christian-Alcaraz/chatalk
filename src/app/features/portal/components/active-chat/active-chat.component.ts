import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { ChatTimestampPipe } from '@shared/pipes/chat-timestamp/chat-timestamp.pipe';
import {
  WebSocketMessage,
  WsService,
} from '@shared/services/api/ws/ws.service';

@Component({
  selector: 'app-active-chat',
  imports: [CommonModule, NgIcon, ChatTimestampPipe],
  standalone: true,
  templateUrl: './active-chat.component.html',
  styleUrl: './active-chat.component.scss',
})
export class ActiveChatComponent {
  private readonly webSocketService = inject(WsService);

  readonly clientId = this.webSocketService.ClientWebSocketId;

  activeChat!: any;

  // sendSocketMessage() {
  //   const message: WebSocketMessage = {
  //     type: 'info',
  //     message: 'This is message',
  //   };

  //   this.webSocketService.sendMessage(message);
  // }

  constructor() {
    this.activeChat = this.webSocketService.activeChat;
  }

  submitMessage(inputElem: HTMLInputElement) {
    const message = inputElem.value;
    if (!message) return;

    const wsMessage: WebSocketMessage = {
      type: 'request',
      message,
      timestamp: new Date(),
    };

    try {
      this.webSocketService.sendMessage(wsMessage);
      this.webSocketService.activeChat.update((prevValue: any) => [
        ...prevValue,
        { ...wsMessage, senderId: this.clientId },
      ]);
      inputElem.value = '';
    } catch (e) {
      console.error('Client is not connected to server');
    }
  }

  isPrevBubbleSameSender(index: number) {
    if (index === 0) return true;
    return (
      this.activeChat()[index].senderId ===
      this.activeChat()[index - 1].senderId
    );
  }
}
