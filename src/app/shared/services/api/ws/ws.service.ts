import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

type WebSocketMessageTypes = 'request' | 'info' | 'error';

interface WebSocketMessage {
  type: WebSocketMessageTypes;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class WsService {
  private wsClient!: WebSocket;
  private readonly RETRY_INTERVAL_IN_SECONDS = 5000;
  private WILL_RETRY = true;

  private intervalId!: any;

  constructor() {}

  disconnect() {
    this.WILL_RETRY = false;
    this.wsClient.close();
  }

  connect() {
    if (
      this.wsClient === undefined ||
      (this.wsClient && this.wsClient.readyState === WebSocket.CLOSED)
    ) {
      this.wsClient = new WebSocket(`${environment.WS_URL}/test`);
    }

    this.wsClient.onopen = (event) => {
      console.info(
        'You have successfully established connection to WebSocket Server.',
      );
      clearInterval(this.intervalId);
      this.intervalId = null;
    };

    this.wsClient.onmessage = (event) => {
      console.log('Server sent message', event.data);
    };

    this.wsClient.onclose = (event) => {
      this.reconnect();
    };

    this.wsClient.onerror = (error) => {
      console.error(error);
    };
  }

  // TODO: Find a way to handle "Sending" state and "Delivered" state
  sendMessage(message: WebSocketMessage) {
    const stringfiedMessage = JSON.stringify(message);

    if (this.wsClient.readyState !== WebSocket.OPEN) {
      this.connect();
      setTimeout(() => {
        this.wsClient.send(stringfiedMessage);
      }, 1000);
    }

    this.wsClient.send(stringfiedMessage);
  }

  private reconnect() {
    if (!this.WILL_RETRY) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      return;
    }

    this.intervalId ??= setInterval(() => {
      this.connect();
    }, this.RETRY_INTERVAL_IN_SECONDS);
  }
}
