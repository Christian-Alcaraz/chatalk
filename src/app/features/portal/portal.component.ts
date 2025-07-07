import { Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-portal',
  imports: [NgIcon, ButtonComponent],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss',
})
export class PortalComponent {
  userFullName = 'John Doe';

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
  ];
}
