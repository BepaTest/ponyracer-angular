import { Inject, Injectable, Type } from '@angular/core';
import { Observable, Observer } from 'rxjs';
//import * as Webstomp from 'webstomp-client';
import { Client, Subscription } from 'webstomp-client';
import { WEBSOCKET, WEBSTOMP } from './app.tokens';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  constructor(@Inject(WEBSOCKET) private WebSocket: Type<WebSocket>, @Inject(WEBSTOMP) private Webstomp: any) {}

  connect<T>(channel: string): Observable<T> {
    return new Observable((observer: Observer<T>) => {
      // TODO create the WebSocket connection
      const environment = { wsBaseUrl: 'wss://ponyracer.ninja-squad.com' };
      const connection: WebSocket = new this.WebSocket(`${environment.wsBaseUrl}/ws`);
      // TODO create the stomp client with Webstomp
      const stompClient: Client = this.Webstomp.over(connection);
      // TODO connect the stomp client
      let subscription: Subscription;
      stompClient.connect(
        { login: '', passcode: '' },
        () => {
          // TODO subscribe to the specific channel
          subscription = stompClient.subscribe(channel, message => {
            // TODO emit the message received, after extracting the JSON from the body
            const bodyAsJson = JSON.parse(message.body);
            observer.next(bodyAsJson);
          });
        },
        error => {
          // propagate the error
          observer.error(error);
        }
      );
      // TODO handle the unsubscription
      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
        connection.close();
      };
    });
  }
}
