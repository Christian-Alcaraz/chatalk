import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-chats',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './recent-chats.component.html',
  styleUrl: './recent-chats.component.scss',
})
export class RecentChatsComponent {
  isScrolled = false;
  /**
   * ? Input as signal??? to directly communicate with request/push notification for new message
   */
  recentChats = [
    {
      id: 1,
      fullName: 'Sara Doe',
      messageSnippet: 'Hey! How are doing?',
      timeDelivered: '2:35pm',
    },
    {
      id: 2,
      fullName: 'ChatAi',
      messageSnippet: 'Something is wrong with you!',
      timeDelivered: '1:35am',
    },
    {
      id: 3,
      fullName: 'Jacob Nesmith',
      messageSnippet: 'I have a recipe for that and it is simple',
      timeDelivered: '1d',
    },
    {
      id: 4,
      fullName: 'Emma Wilson',
      messageSnippet: 'Thanks for you help!',
      timeDelivered: '3y',
    },
    {
      id: 4,
      fullName: 'Emma Wilson',
      messageSnippet: 'Thanks for you help!',
      timeDelivered: '3y',
    },
    {
      id: 4,
      fullName: 'Emma Wilson',
      messageSnippet: 'Thanks for you help!',
      timeDelivered: '3y',
    },
    {
      id: 4,
      fullName: 'Emma Wilson',
      messageSnippet: 'Thanks for you help!',
      timeDelivered: '3y',
    },
    {
      id: 4,
      fullName: 'Emma Wilson',
      messageSnippet: 'Thanks for you help!',
      timeDelivered: '3y',
    },
    {
      id: 4,
      fullName: 'Emma Wilson',
      messageSnippet: 'Thanks for you help!',
      timeDelivered: '3y',
    },
    {
      id: 4,
      fullName: 'Emma Wilson',
      messageSnippet: 'Thanks for you help!',
      timeDelivered: '3y',
    },
    {
      id: 4,
      fullName: 'Emma Wilson',
      messageSnippet: 'Thanks for you help!',
      timeDelivered: '3y',
    },
    {
      id: 4,
      fullName: 'Emma Wilson',
      messageSnippet: 'Thanks for you help!',
      timeDelivered: '3y',
    },
  ];

  onScroll(element: HTMLElement): void {
    this.isScrolled = element.scrollTop > 0;
  }
}
