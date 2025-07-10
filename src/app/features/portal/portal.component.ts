import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { WsService } from '@shared/services/api/ws/ws.service';
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
export class PortalComponent implements OnInit, OnDestroy {
  private readonly webSocketService = inject(WsService);

  userState = {
    id: '123',
    fullName: 'John Doe',
  };

  constructor() {
    this.webSocketService.connect();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
