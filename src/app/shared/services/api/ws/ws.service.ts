import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

type WebSocketMessageTypes = 'request' | 'info' | 'error' | 'ping';

export interface WebSocketMessage {
  type: WebSocketMessageTypes;
  message: any;
}

@Injectable({
  providedIn: 'root',
})
export class WsService {
  private wsClient!: WebSocket;
  private readonly RETRY_INTERVAL_IN_SECONDS = 1000 * 10; // 10 secs
  private WILL_RETRY = true;
  private clientWebSocketId!: string;

  private intervalId!: any;

  constructor() {}

  setClientWebSocketId(uuid: string) {
    this.clientWebSocketId = uuid;
  }

  /**
   * * Bug: First attempt to connect doesn't send message. Then when reattempt successful, the message sent stacks??
   */

  disconnect() {
    if (!!this.wsClient) {
      console.info('Disconnecting to WSS');
      console.log('Before close:', this.wsClient.readyState); // Should be 1 (OPEN)
      this.WILL_RETRY = false;
      this.wsClient.close(1000, 'Manual Closing');
      console.log('After close:', this.wsClient.readyState); // Likely 2 (CLOSING)
    }
  }

  connect() {
    if (
      !this.wsClient ||
      (this.wsClient && this.wsClient.readyState >= WebSocket.CLOSING)
    ) {
      // ? for distinction of requester identity
      this.wsClient = new WebSocket(
        `${environment.WS_URL}/${this.clientWebSocketId}/test`,
      );

      this.wsClient.onopen = (event) => {
        console.info(
          'You have successfully established connection to WebSocket Server.',
        );

        const connectSuccess: WebSocketMessage = {
          type: 'info',
          message: 'Client established connection',
        };
        clearInterval(this.intervalId);
        this.intervalId = null;
        // Send message to server for testing

        this.sendMessage(connectSuccess);
      };

      this.wsClient.onmessage = (event) => {
        const { data } = event;

        const test = data.toString('utf-8');

        console.log('Server sent message', test);
      };

      this.wsClient.onclose = (event) => {
        console.log('You send server close request');
        // this.reconnect();
      };

      this.wsClient.onerror = (error) => {
        console.error(error);
      };
    }
  }

  // TODO: Find a way to handle "Sending" state and "Delivered" state
  sendMessage(message: WebSocketMessage) {
    const stringfiedMessage = JSON.stringify(message);

    console.log('WS Client ReadState', this.wsClient!.readyState);

    if (this.wsClient.readyState !== WebSocket.OPEN) {
      console.error('Connection with Websocket server hasnt been established ');
      return;
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
