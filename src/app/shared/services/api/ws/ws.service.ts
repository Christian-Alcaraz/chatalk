import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

type WebSocketMessageTypes = 'request' | 'info' | 'error' | 'ping' | 'ack' | 'pong' | 'broadcast';

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
  private hasEstablishedConnection = false;
  private reconnectAttempts = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 5;

  private intervalId!: any;

  constructor() {}

  setClientWebSocketId(uuid: string) {
    this.clientWebSocketId = uuid;
  }

  /**
   * * Fixed: Prevent duplicate connection messages by tracking connection state
   * * Fixed: Improved reconnection logic to prevent message stacking
   */

  disconnect() {
    if (!!this.wsClient) {
      console.info('Disconnecting to WSS');
      console.log('Before close:', this.wsClient.readyState); // Should be 1 (OPEN)
      this.WILL_RETRY = false;
      this.hasEstablishedConnection = false;
      
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

        // Clear any pending reconnection attempts
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }

        // Reset reconnection attempts on successful connection
        this.reconnectAttempts = 0;

        // Only send connection message on first successful connection
        if (!this.hasEstablishedConnection) {
          const connectSuccess: WebSocketMessage = {
            type: 'info',
            message: 'Client established connection',
          };
          
          this.sendMessage(connectSuccess);
          this.hasEstablishedConnection = true;
        } else {
          console.log('Reconnected to WebSocket server');
        }
      };

      this.wsClient.onmessage = (event) => {
        const { data } = event;

        try {
          // Try to parse as JSON first
          const parsedMessage = JSON.parse(data);
          console.log('Server sent JSON message:', parsedMessage);
          
          // Handle different message types from server
          this.handleServerMessage(parsedMessage);
        } catch (parseError) {
          // Handle plain text messages
          console.log('Server sent text message:', data);
        }
      };

      this.wsClient.onclose = (event) => {
        console.log('WebSocket connection closed', event.code, event.reason);
        
        // Only attempt reconnect if it wasn't a manual close and we should retry
        if (event.code !== 1000 && this.WILL_RETRY) {
          console.log('Attempting to reconnect...');
          this.reconnect();
        } else {
          // Reset connection flag for manual closes
          this.hasEstablishedConnection = false;
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

  resetConnectionState() {
    this.hasEstablishedConnection = false;
    this.WILL_RETRY = true;
    this.reconnectAttempts = 0;
  }

  // Handle different types of messages from server
  private handleServerMessage(message: any) {
    switch (message.type) {
      case 'ack':
        console.log('Server acknowledged message:', message.message);
        break;
      
      case 'pong':
        console.log('Server responded to ping at:', message.timestamp);
        break;
      
      case 'error':
        console.error('Server reported error:', message.message);
        break;
      
      case 'broadcast':
        console.log('Server broadcast:', message.message);
        // Handle broadcast messages (e.g., notifications to all clients)
        break;
      
      default:
        console.log('Unknown message type from server:', message);
    }
  }

  // Send a ping to test connection
  sendPing() {
    const pingMessage: WebSocketMessage = {
      type: 'ping',
      message: 'Client ping'
    };
    return this.sendMessage(pingMessage);
  }

  private reconnect() {
    if (!this.WILL_RETRY) {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      return;
    }

    // Check if we've exceeded max reconnection attempts
    if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
      console.error('Max reconnection attempts reached. Stopping reconnection.');
      this.WILL_RETRY = false;
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      return;
    }

    // Prevent multiple reconnection attempts
    if (this.intervalId) {
      return;
    }

    console.log(`Setting up reconnection interval... (Attempt ${this.reconnectAttempts + 1}/${this.MAX_RECONNECT_ATTEMPTS})`);
    this.intervalId = setInterval(() => {
      console.log(`Attempting reconnection... (Attempt ${this.reconnectAttempts + 1}/${this.MAX_RECONNECT_ATTEMPTS})`);
      
      if (this.wsClient && this.wsClient.readyState === WebSocket.OPEN) {
        // Already connected, clear the interval
        clearInterval(this.intervalId);
        this.intervalId = null;
        return;
      }
      
      this.reconnectAttempts++;
      this.connect();

      // If this was the last attempt, stop trying
      if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.WILL_RETRY = false;
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
