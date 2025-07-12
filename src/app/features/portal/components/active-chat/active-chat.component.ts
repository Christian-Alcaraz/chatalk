import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import {
  WebSocketMessage,
  WsService,
} from '@shared/services/api/ws/ws.service';

@Component({
  selector: 'app-active-chat',
  imports: [CommonModule, NgIcon],
  standalone: true,
  templateUrl: './active-chat.component.html',
  styleUrl: './active-chat.component.scss',
})
export class ActiveChatComponent {
  private readonly webSocketService = inject(WsService);

  userState = {
    id: '123',
    fullName: 'John Doe',
  };

  activeChat = [
    {
      messageId: '1',
      userId: '1',
      message: `Once upon a time, there was something going on inside the village. Whereas in the castle, a thing with dracula is quite peculiar.`,
      timeDelivered: '1:20pm',
    },
    {
      messageId: '2',
      userId: '123',
      message: `Once upon a time, there was something going on inside the village. Whereas in the castle, a thing with dracula is quite peculiar.`,
      timeDelivered: '1:20pm',
    },
    {
      messageId: '1',
      userId: '1',
      message: `Once upon a time, there was something going on inside the village. Whereas in the castle, a thing with dracula is quite peculiar.`,
      timeDelivered: '1:20pm',
    },
    {
      messageId: '2',
      userId: '123',
      message: `Once upon a time, there was something going on inside the village. Whereas in the castle, a thing with dracula is quite peculiar.`,
      timeDelivered: '1:20pm',
    },
    {
      messageId: '1',
      userId: '1',
      message: `Once upon a time, there was something going on inside the village. Whereas in the castle, a thing with dracula is quite peculiar.`,
      timeDelivered: '1:20pm',
    },
    {
      messageId: '2',
      userId: '123',
      message: `Once upon a time, there was something going on inside the village. Whereas in the castle, a thing with dracula is quite peculiar.`,
      timeDelivered: '1:20pm',
    },
    {
      messageId: '1',
      userId: '1',
      message: `Once upon a time, there was something going on inside the village. Whereas in the castle, a thing with dracula is quite peculiar.`,
      timeDelivered: '1:20pm',
    },
    {
      messageId: '2',
      userId: '123',
      message: `Once upon a time, there was something going on inside the village. Whereas in the castle, a thing with dracula is quite peculiar.`,
      timeDelivered: '1:20pm',
    },
    {
      messageId: '1',
      userId: '1',
      message: `Once upon a time, there was something going on inside the village. Whereas in the castle, a thing with dracula is quite peculiar.`,
      timeDelivered: '1:20pm',
    },
    {
      messageId: '2',
      userId: '123',
      message: `Once upon a time, there was something going on inside the village. Whereas in the castle, a thing with dracula is quite peculiar.`,
      timeDelivered: '1:20pm',
    },
    {
      messageId: '1',
      userId: '1',
      message: `Once upon a time, there was something going on inside the village. Whereas in the castle, a thing with dracula is quite peculiar.`,
      timeDelivered: '1:20pm',
    },
    {
      messageId: '2',
      userId: '123',
      message: `Once upon a time, there was something going on inside the village. Whereas in the castle, a thing with dracula is quite peculiar.`,
      timeDelivered: '1:20pm',
    },
  ];

  // sendSocketMessage() {
  //   const message: WebSocketMessage = {
  //     type: 'info',
  //     message: 'This is message',
  //   };

  //   this.webSocketService.sendMessage(message);
  // }

  submitMessage(inputElem: HTMLInputElement) {
    const message = inputElem.value;
    if (!message) return;

    const wsMessage: WebSocketMessage = {
      type: 'info',
      message,
    };
    this.webSocketService.sendMessage(wsMessage);
    inputElem.value = '';
  }
}
