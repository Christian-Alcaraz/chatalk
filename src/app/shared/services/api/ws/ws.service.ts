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
      
      // Clear any pending reconnection attempts
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      
      this.wsClient.close(1000, 'Manual Closing');
      console.log('After close:', this.wsClient.readyState); // Likely 2 (CLOSING)
    }
  }

  connect() {
    // Don't create new connection if already connected
    if (this.wsClient && this.wsClient.readyState === WebSocket.OPEN) {
      console.log('WebSocket is already connected');
      return;
    }

    // Don't create new connection if currently connecting
    if (this.wsClient && this.wsClient.readyState === WebSocket.CONNECTING) {
      console.log('WebSocket is already connecting');
      return;
    }

    if (
      !this.wsClient ||
      (this.wsClient && this.wsClient.readyState >= WebSocket.CLOSING)
    ) {
      console.log('Creating new WebSocket connection...');
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
        console.log('WebSocket connection closed', event.code, event.reason);
        
        // Only attempt reconnect if it wasn't a manual close and we should retry
        if (event.code !== 1000 && this.WILL_RETRY) {
          console.log('Attempting to reconnect...');
          this.reconnect();
        } else {
          // Clean up if it was a manual close
          this.cleanup();
        }
      };

      this.wsClient.onerror = (error) => {
        console.error('WebSocket error occurred:', error);
        // Connection will be handled by onclose event
      };
    }
  }

  // TODO: Find a way to handle "Sending" state and "Delivered" state
  sendMessage(message: WebSocketMessage) {
    if (!this.wsClient) {
      console.error('WebSocket client not initialized');
      return false;
    }

    const stringfiedMessage = JSON.stringify(message);

    console.log('WS Client ReadState', this.wsClient.readyState);

    if (this.wsClient.readyState !== WebSocket.OPEN) {
      console.error('Connection with Websocket server hasnt been established');
      return false;
    }

    try {
      this.wsClient.send(stringfiedMessage);
      return true;
    } catch (error) {
      console.error('Failed to send message:', error);
      return false;
    }
  }

  isConnected(): boolean {
    return this.wsClient && this.wsClient.readyState === WebSocket.OPEN;
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

  private cleanup() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    // Reset the WebSocket client reference
    if (this.wsClient) {
      this.wsClient = null as any;
    }
  }
}
