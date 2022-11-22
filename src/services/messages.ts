import { EventBus } from 'core';
import { XHRFetch } from 'helpers';
import { MessageViewDTO } from 'api';
import { transformMessageView } from 'utils';

class Socket extends EventBus {
  websocket?: WebSocket;

  connectToWebsocket(userId: number, chatID: number) {
    XHRFetch
      .post(`/chats/token/${chatID}`)
      .then((tokenRes: string | any) => {
        const { token } = tokenRes;
        const ws = new WebSocket(`${process.env.WS_ENDPOINT}/${userId}/${chatID}/${token}`);
        this.websocket = ws;
        ws.addEventListener('open', () => {
          window.store.dispatch({ ws, messages: this.getMessages() });
        });

        ws.addEventListener('close', (e) => {
          if (e.wasClean) {
            console.log('Disconected');
          } else {
            console.log('Lost connection');
          }

          console.log(`Code: ${e.code}, Reason: ${e.reason}`);
        });

        ws.addEventListener('message', (e) => {
          try {
            const data = JSON.parse(e.data);
            console.info('Data received', { data });

            if (Array.isArray(data)) {
              const filteredMessages = data.filter((message: any) => message.content) || [];
              const messages = filteredMessages
                .map((data) => transformMessageView(data as MessageViewDTO))
                .sort((a, b) => b.id - a.id);

              window.store.dispatch({
                messages,
              });
              return;
            }

            if (
              data.type === 'user connected'
              || data.type === 'pong'
              || !data.content
            ) {
              return;
            }

            if (data.type === 'message' && data.content) {
              window.store.dispatch({
                messages: this.getMessages(),
              });
            }
          } catch (err) {
            console.error(err);
          }
        });
      });
  }

  getMessages() {
    return this.websocket?.send(JSON.stringify({
      content: '0',
      type: 'get old',
    }));
  }

  sendMessage(message: string) {
    window.store.getState().ws!.send(JSON.stringify({
      content: message,
      type: 'message',
    }));
    this.getMessages();
  }
}

const ComposedSocket = new Socket();

export { ComposedSocket as Socket };
