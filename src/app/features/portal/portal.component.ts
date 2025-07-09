import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ActiveChatComponent } from './components/active-chat/active-chat.component';
import { RecentChatsComponent } from './components/recent-chats/recent-chats.component';

@Component({
  selector: 'app-portal',
  imports: [
    NgIcon,
    ButtonComponent,
    CommonModule,
    RecentChatsComponent,
    ActiveChatComponent,
  ],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss',
})
export class PortalComponent {
  isScrolled = false;
  userState = {
    id: '123',
    fullName: 'John Doe',
  };

  onScroll(element: HTMLElement): void {
    this.isScrolled = element.scrollTop > 0;
  }
}
