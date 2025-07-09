import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-active-chat',
  imports: [CommonModule, NgIcon],
  standalone: true,
  templateUrl: './active-chat.component.html',
  styleUrl: './active-chat.component.scss',
})
export class ActiveChatComponent {
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
}
