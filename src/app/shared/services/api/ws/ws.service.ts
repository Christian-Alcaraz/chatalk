import { Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';

export type WebSocketMessageTypes =
  | 'request'
  | 'info'
  | 'error'
  | 'ping'
  | 'pong';

export interface WebSocketMessage {
  type: WebSocketMessageTypes;
  message: any;
  timestamp?: Date | string;
}

@Injectable({
  providedIn: 'root',
})
export class WsService {
  private wsClient!: WebSocket;
  private willRetry = true;
  private clientWebSocketId!: string;
  private hasEstablishedConnection = false;
  private reconnectAttempts = 0;
  private intervalId!: any;

  private readonly MAX_RECONNECT_ATTEMPTS = 5;
  private readonly RETRY_INTERVAL_IN_SECONDS = 1000 * 10; // 10 secs

  // TODO: Refactor this to signal???
  activeChat: any = signal([]);

  constructor() {}

  // TODO: Make this signal, class extends? so child component can just inherit it directly without using this service?
  setClientWebSocketId(uuid: string) {
    this.clientWebSocketId = uuid;
  }

  get ClientWebSocketId() {
    return this.clientWebSocketId;
  }

  /**
   * * Bug: First attempt to connect doesn't send message. Then when reattempt successful, the message sent stacks??
   */

  disconnect() {
    if (!this.wsClient) return;

    this.willRetry = false;

    // Clear any pending reconnection attempts
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.wsClient.close(
      1000,
      'Client is manually requesting to disconnect from the server',
    );
  }

  connect() {
    // Don't create new connection if already connected
    if (this.wsClient && this.wsClient.readyState <= WebSocket.OPEN) {
      return;
    }

    if (
      !this.wsClient ||
      (this.wsClient && this.wsClient.readyState >= WebSocket.CLOSING)
    ) {
      // ? for distinction of requester identity
      this.wsClient = new WebSocket(
        `${environment.WS_URL}/${this.clientWebSocketId}/test`,
      );

      // * websocket OPEN_EVENT
      this.wsClient.onopen = (event) => {
        console.info(
          'You have successfully established connection to WebSocket Server.',
        );

        // Clear any pending reconnection attempts
        if (this.intervalId) {
          this.clearIntervalId();
        }

        // Reset reconnection attempts on successful connection
        this.reconnectAttempts = 0;

        // Only send connection message on first successful connection
        if (!this.hasEstablishedConnection) {
          this.sendMessage({
            type: 'info',
            message: 'Client established connection',
          });
          this.hasEstablishedConnection = true;
        } else {
          console.log('Reconnected to WebSocket server');
        }
      };

      // * websocket MESSAGE_EVENT
      this.wsClient.onmessage = (event) => {
        const { data } = event;

        try {
          // Try to parse as JSON first
          const parsedMessage = JSON.parse(data);
          this.handleServerMessage(parsedMessage);
        } catch (parseError) {
          // Handle plain text messages
          console.log('Server sent text message:', data);
        }
      };

      // * websocket CLOSE_EVENT
      this.wsClient.onclose = (event) => {
        console.info('WebSocket connection closed', event.code, event.reason);
        const MANUAL_DISCONNECT = 1000;

        if (event.code !== MANUAL_DISCONNECT && this.willRetry) {
          console.info('Attempting to reconnect...');
          this.reconnect();
        } else {
          this.cleanup();
        }
        // this.reconnect();
      };

      // * websocket ERROR_EVENT
      this.wsClient.onerror = (error) => {
        console.error(error);
      };

      // * websocket PING_EVENT
      this.wsClient.addEventListener('ping', (event) => {
        console.log('PING EVENT', event);
      });
    }
  }

  // TODO: Find a way to handle "Sending" state and "Delivered" state
  sendMessage(message: WebSocketMessage) {
    const stringfiedMessage = JSON.stringify(message);

    if (this.wsClient.readyState !== WebSocket.OPEN) {
      console.error('Connection with Websocket server hasnt been established ');
      return;
    }

    this.wsClient.send(stringfiedMessage);
  }

  private handleServerMessage(message: any) {
    switch (message.type) {
      case 'ping':
        this.sendPong();
        break;

      case 'error':
        console.error('Server reported error:', message.message);
        break;

      case 'broadcast':
        console.log('Server broadcast:', message.message);
        // Handle broadcast messages (e.g., notifications to all clients)
        break;

      case 'request':
        this.activeChat.update((prevValue: any) => [...prevValue, message]);
        break;

      default:
    }
  }

  sendPong() {
    return this.sendMessage({
      type: 'pong',
      message: 'Client ping',
    });
  }

  private clearIntervalId() {
    if (!this.intervalId) return;

    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  private reconnect() {
    if (!this.willRetry) {
      if (this.intervalId) {
        this.clearIntervalId();
      }
      return;
    }

    // Check if we've exceeded max reconnection attempts
    if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
      console.error(
        'Max reconnection attempts reached. Stopping reconnection.',
      );
      this.willRetry = false;
      if (this.intervalId) {
        this.clearIntervalId();
      }
      return;
    }

    // Prevent multiple reconnection attempts
    if (this.intervalId) {
      return;
    }

    this.intervalId = setInterval(() => {
      console.info(
        `Attempting reconnection... (Attempt ${this.reconnectAttempts + 1}/${this.MAX_RECONNECT_ATTEMPTS})`,
      );

      if (this.wsClient && this.wsClient.readyState === WebSocket.OPEN) {
        // Already connected, clear the interval
        this.clearIntervalId();
        return;
      }

      this.reconnectAttempts++;
      this.connect();

      // If this was the last attempt, stop trying
      if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
        this.clearIntervalId();
        this.willRetry = false;
        console.error('Max reconnection attempts reached. Giving up.');
      }
    }, this.RETRY_INTERVAL_IN_SECONDS);
  }

  private cleanup() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    // Reset connection state
    this.hasEstablishedConnection = false;
    this.reconnectAttempts = 0;

    // Reset the WebSocket client reference
    if (this.wsClient) {
      this.wsClient = null as any;
    }
  }
}
